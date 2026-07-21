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
        $requests = MaterialRequest::with([
            'productionOrder.product',
            'details.material'
        ])
            ->where('status', '!=', 'Cancelled')
            ->latest()
            ->get();

        return Inertia::render('Gudang/MaterialRequest/Index', [
            'requests' => $requests,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id'    => 'required|exists:products,id',
            'qty_produksi'  => 'required|numeric|min:0.0001',
            'boms'          => 'required|array|min:1',

            'boms.*.material_id' => 'required|exists:materials,id',
            'boms.*.qty_request' => 'required|numeric|min:0.0001',
            'boms.*.satuan'      => 'required|string',
        ]);

        DB::beginTransaction();

        try {

            // =========================
            // GENERATE NOMOR MR
            // Format: MR-250721-001
            // =========================

            $tanggal = now()->format('ymd'); // 250721

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

                'nomor_mr'           => 'MR-' . now()->format('YmdHis'),

                'production_order_id' => null,

                'tanggal'            => now(),

                'status'             => 'Waiting Approval',

                'created_by'         => auth()->id(),

            ]);


            // =========================
            // DETAIL MATERIAL REQUEST
            // =========================
            foreach ($request->boms as $bom) {

                MaterialRequestDetail::create([

                    'material_request_id' => $mr->id,

                    'material_id'         => $bom['material_id'],

                    // hasil final dari React (sudah decimal)
                    'qty_request'         => round((float) $bom['qty_request'], 4),

                    'qty_approved'        => 0,

                    // satuan mengikuti BOM
                    'satuan'              => $bom['satuan'],

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
            ]);
        }
    }

    public function show(MaterialRequest $materialRequest)
    {

        $materialRequest->load(
            'details.material'
        );


        return Inertia::render(
            'Gudang/MaterialRequest/Detail',
            [
                'mr' => $materialRequest
            ]
        );

        $materialRequest->load('details.material');

        return Inertia::render('Gudang/MaterialRequest/Show', [
            'materialRequest' => $materialRequest,
        ]);
    }

    public function cancel(MaterialRequest $materialRequest)
    {
        // ubah status jadi Cancelled (history tetap ada)
        $materialRequest->update([
            'status' => 'Cancelled',
        ]);

        // simpan activity log
        ActivityLog::create([
            'user_id' => auth()->id(),
            'module' => 'Material Request',
            'action' => 'CANCEL',
            'reference_type' => 'MaterialRequest',
            'reference_id' => $materialRequest->id,
            'description' => 'MR dibatalkan - ' . $materialRequest->nomor_mr,
            'ip_address' => request()->ip(),
        ]);

        return redirect()
            ->route('material-requests.index')
            ->with('success', 'Material Request berhasil dibatalkan.');
    }

    // print
    public function print($id)
    {
        $request = MaterialRequest::with([
            'details.material',
            'productionOrder'
        ])->findOrFail($id);

        return view(
            'material_requests.print',
            compact('request')
        );
    }


    public function approve(MaterialRequest $materialRequest)
    {

        DB::transaction(function () use ($materialRequest) {


            // hanya pending yang boleh approve
            if ($materialRequest->status !== 'Waiting Approval') {
                return;
            }


            foreach ($materialRequest->details as $detail) {

                $material = Material::find(
                    $detail->material_id
                );


                if (!$material) {
                    continue;
                }


                // potong stok gudang
                $material->stok -= $detail->qty_request;

                $material->save();



                // update jumlah approve

                $detail->update([

                    'qty_approved' => $detail->qty_request

                ]);
            }



            // update header MR

            $materialRequest->update([

                'status' => 'Approved',

                'approved_by' => auth()->id(),

                'approved_at' => now()

            ]);
        });






        return redirect()
            ->route(
                'material-requests.show',
                $materialRequest->id
            );
    }

    public function reject(MaterialRequest $materialRequest)
    {
        // hanya bisa reject jika masih pending
        if ($materialRequest->status !== 'Pending') {

            return back()->with('error', 'MR sudah diproses.');
        }

        $materialRequest->update([
            'status' => 'Rejected',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        // simpan activity
        ActivityLog::create([
            'user_id' => auth()->id(),
            'module' => 'Material Request',
            'action' => 'REJECT',
            'reference_type' => 'MaterialRequest',
            'reference_id' => $materialRequest->id,
            'description' => 'MR ditolak - ' . $materialRequest->nomor_mr,
            'ip_address' => request()->ip(),
        ]);

        return back()->with('success', 'Material Request berhasil ditolak.');
    }
}
