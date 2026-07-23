<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaterialRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\MaterialRequestDetail;
use App\Models\Material;
use App\Models\ActivityLog;


class MaterialRequestController extends Controller
{
    public function index()
    {
        MaterialRequest::where('status', 'Waiting Approval')
            ->where('created_at', '<=', now()->subHours(8))
            ->update([
                'status' => 'Pending'
            ]);

        $requests = MaterialRequest::with([
            'productionOrder.product',
            'details.material'
        ])
            ->withCount('details')
            ->where('status', '!=', 'Cancelled')
            ->latest()
            ->get()
            ->map(function ($mr) {

                $mr->material_ready_count = $mr->details
                    ->where('qty_approved', '>', 0)
                    ->count();

                $materials = $mr->details
                    ->pluck('material.nama')
                    ->filter()
                    ->values();

                $mr->material_preview = match (true) {
                    $materials->count() === 0 => '-',
                    $materials->count() === 1 => $materials[0],
                    $materials->count() === 2 => $materials[0] . ', ' . $materials[1],
                    default => $materials[0] . ' + ' . ($materials->count() - 1) . ' material lainnya',
                };

                return $mr;
            });

        $requests->transform(function ($mr) {

            $mr->material_ready_count = $mr->details
                ->where('qty_approved', '>', 0)
                ->count();

            $materials = $mr->details
                ->pluck('material.nama')
                ->filter()
                ->values();

            $mr->material_preview = match (true) {
                $materials->count() === 0 => '-',
                $materials->count() === 1 => $materials[0],
                $materials->count() === 2 => $materials[0] . ', ' . $materials[1],
                default => $materials[0] . ' + ' . ($materials->count() - 1) . ' material lainnya',
            };

            return $mr;
        });

        return Inertia::render('Gudang/MaterialRequest/Index', [
            'requests' => $requests,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'boms.*.material_id' => 'required|exists:materials,id',
            'boms.*.qty_request' => 'required|numeric|min:0.0001',
            'boms.*.satuan'      => 'required|string',

            // ubah required menjadi nullable
            'production_order_id' => 'nullable|exists:production_orders,id',

            'product_id'          => 'required|exists:products,id',
            'qty_produksi'        => 'required|numeric|min:0.0001',
            'boms'                => 'required|array|min:1',
        ]);

        DB::beginTransaction();

        try {

            // =========================
            // GENERATE NOMOR MR
            // Format: MR-260721-001
            // =========================
            $tanggal = now()->format('ymd');

            $lastMr = MaterialRequest::whereDate('created_at', today())
                ->latest('id')
                ->first();

            $urutan = $lastMr
                ? ((int) substr($lastMr->nomor_mr, -3)) + 1
                : 1;

            $nomorMr = 'MR-' . $tanggal . '-' . str_pad($urutan, 3, '0', STR_PAD_LEFT);
            // =========================
            // HEADER MATERIAL REQUEST
            // =========================
            $mr = MaterialRequest::create([
                'nomor_mr'            => $nomorMr,
                'production_order_id' => $request->production_order_id,
                'tanggal'             => now(),
                'status'              => 'Waiting Approval',
                'created_by'          => auth()->id(),
            ]);


            // =========================
            // DETAIL MATERIAL REQUEST
            // =========================
            foreach ($request->boms as $bom) {

                MaterialRequestDetail::create([
                    'material_request_id' => $mr->id,
                    'material_id'         => $bom['material_id'],
                    'qty_request'         => round((float) $bom['qty_request'], 4),
                    'qty_approved'        => 0,
                    'satuan'              => $bom['satuan'], // WAJIB
                ]);
            }
            // =========================
            // ACTIVITY LOG
            // =========================
            ActivityLog::create([
                'user_id'        => auth()->id(),
                'module'         => 'Material Request',
                'action'         => 'CREATE',
                'reference_type' => 'MaterialRequest',
                'reference_id'   => $mr->id,
                'activity'       => 'Create Material Request',
                'description'    => 'MR baru dari Produksi - ' . $mr->nomor_mr,
                'ip_address'     => $request->ip(),
            ]);


            DB::commit();


            return redirect()
                ->route('material-requests.index')
                ->with('success', 'Material Request berhasil dikirim ke Gudang.');
        } catch (\Exception $e) {

            DB::rollBack();

            dd([
                'message' => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile(),
                'request' => $request->all(),
            ]);
        }
    }

    // TAMBAHKAN DI SINI
    public function show(MaterialRequest $materialRequest)
    {
        $materialRequest->load([
            'productionOrder.product',
            'details.material'
        ]);

        return Inertia::render('Gudang/MaterialRequest/Detail', [
            'mr' => $materialRequest
        ]);
    }

    public function print($id)
    {
        $mr = MaterialRequest::with([
            'productionOrder.product',
            'details.material',
            'creator',
            'approver'
        ])->findOrFail($id);

        return view('material_requests.print', compact('mr'));
    }


    public function approve(MaterialRequest $materialRequest)
    {
        DB::transaction(function () use ($materialRequest) {

            // LOAD RELASI
            $materialRequest->load('details.material');

            $pendingItems = [];

            foreach ($materialRequest->details as $detail) {

                $material = $detail->material;

                // qty request
                $requestQty = (float) $detail->qty_request;

                // konversi CM ke meter
                $requestDalamMeter = strtoupper($detail->satuan) === 'CM'
                    ? $requestQty / 100
                    : $requestQty;

                // stok fisik (roll)
                $stokFisik = (float) $material->stok;

                // isi per roll (meter)
                $isiKemasan = (float) ($material->isi_kemasan ?? 1);

                // total meter tersedia
                $stokTersedia = $stokFisik * $isiKemasan;

                // =========================
                // STOK CUKUP
                // =========================
                if ($stokTersedia >= $requestDalamMeter) {

                    $rollTerpakai = $requestDalamMeter / $isiKemasan;

                    $material->update([
                        'stok' => round($stokFisik - $rollTerpakai, 4),
                    ]);

                    $detail->update([
                        'qty_approved' => round($requestQty, 4),
                    ]);
                } else {

                    // =========================
                    // STOK KURANG
                    // =========================

                    $approvedMeter = max($stokTersedia, 0);

                    $remainingMeter = $requestDalamMeter - $approvedMeter;

                    // stok habis
                    $material->update([
                        'stok' => 0,
                    ]);

                    // kembalikan ke satuan asli
                    $approvedQty = strtoupper($detail->satuan) === 'CM'
                        ? $approvedMeter * 100
                        : $approvedMeter;

                    $remainingQty = strtoupper($detail->satuan) === 'CM'
                        ? $remainingMeter * 100
                        : $remainingMeter;

                    $detail->update([
                        'qty_approved' => round($approvedQty, 4),
                    ]);

                    $pendingItems[] = [
                        'material_id' => $material->id,
                        'qty_request' => round($remainingQty, 4),
                        'satuan'      => $detail->satuan,
                    ];
                }
            }

            // UPDATE STATUS
            $materialRequest->update([
                'status'      => count($pendingItems) ? 'Partial' : 'Approved',
                'approved_by' => auth()->id(),
                'approved_at' => now(),
            ]);

            // ACTIVITY LOG
            ActivityLog::create([
                'user_id'        => auth()->id(),
                'module'         => 'Material Request',
                'action'         => 'APPROVE',
                'reference_type' => 'MaterialRequest',
                'reference_id'   => $materialRequest->id,
                'activity'       => 'Approve Material Request',
                'description'    => 'Approve MR ' . $materialRequest->nomor_mr,
                'ip_address'     => request()->ip(),
            ]);
        });
        return back()->with('success', 'Material Request berhasil diproses');
    }

    public function reject(Request $request, MaterialRequest $materialRequest)
    {
        $request->validate([
            'reason' => 'required|string|min:5',
        ]);

        $materialRequest->update([
            'status' => 'Rejected',
            'reject_reason' => $request->reason,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'module' => 'Material Request',
            'action' => 'REJECT',
            'reference_type' => 'MaterialRequest',
            'reference_id' => $materialRequest->id,
            'activity' => 'Reject Material Request',
            'description' => 'Reject MR ' . $materialRequest->nomor_mr,
            'ip_address' => request()->ip(),
        ]);

        MaterialRequestDetail::create([
            'material_request_id' => $mr->id,
            'material_id'         => $bom->material_id,
            'qty_request'         => $totalKebutuhan,
            'qty_approved'        => 0,
            'satuan'              => $bom->satuan, // ✅ dari BOM
        ]);

        return back()->with('success', 'Material Request berhasil direject.');
    }
}
