<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaterialRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\MaterialRequestDetail;
use App\Models\Material;

class MaterialRequestController extends Controller
{
    public function index()
    {
        $mrs = MaterialRequest::with([
            'productionOrder.product',
            'details.material'
        ])->latest()->get();

        return Inertia::render(
            'Gudang/MaterialRequest/Index',
            [
                'requests' => MaterialRequest::latest()->get()
            ]
        );
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $mr = MaterialRequest::create([

                'nomor_mr' => 'MR-' . now()->format('YmdHis'),

                'production_order_id' => null,

                'tanggal' => now(),

                'status' => 'Pending',

                'created_by' => auth()->id(),

            ]);


            foreach ($request->boms as $bom) {

                $qtyProduksi = (float)$request->qty_produksi;

                $kebutuhan = (float)$bom['kebutuhan'];

                $waste = (float)$bom['waste'];


                $subtotal = $qtyProduksi * $kebutuhan;

                $total = (int) ceil(
                    $subtotal + ($subtotal * $waste / 100)
                );


                MaterialRequestDetail::create([

                    'material_request_id' => $mr->id,

                    'material_id' => $bom['material_id'],

                    'qty_request' => $total,

                    'qty_approved' => 0,

                ]);
            }


            DB::commit();


            return redirect()
                ->route('material-requests.index');
        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());
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
    }

    public function approve(MaterialRequest $materialRequest)
    {

        DB::transaction(function () use ($materialRequest) {


            // hanya pending yang boleh approve
            if ($materialRequest->status !== 'Pending') {

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
}
