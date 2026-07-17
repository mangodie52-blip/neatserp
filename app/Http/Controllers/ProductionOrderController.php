<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductionOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductionOrderController extends Controller
{
    /**
     * Tampilkan daftar SPK
     */
    public function index()
    {
        return Inertia::render('Production/Index', [
            'orders' => ProductionOrder::with('product')
                ->latest()
                ->get(),

            'products' => Product::all(),
        ]);
    }

    /**
     * Simpan SPK baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomor_spk' => 'required|unique:production_orders,nomor_spk',
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|numeric|min:1',
            'tanggal' => 'required|date',
        ]);

        ProductionOrder::create([
            'nomor_spk' => $request->nomor_spk,
            'product_id' => $request->product_id,
            'qty' => $request->qty,
            'tanggal' => $request->tanggal,
            'status' => 'Draft',
        ]);

        return redirect()->back()->with('success', 'SPK berhasil ditambahkan.');
    }

    /**
     * Update SPK
     */
    public function update(Request $request, ProductionOrder $productionOrder)
    {
        $request->validate([
            'nomor_spk' => [
                'required',
                Rule::unique('production_orders', 'nomor_spk')
                    ->ignore($productionOrder->id),
            ],
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|numeric|min:1',
            'tanggal' => 'required|date',
            'status' => 'required',
        ]);

        $productionOrder->update([
            'nomor_spk' => $request->nomor_spk,
            'product_id' => $request->product_id,
            'qty' => $request->qty,
            'tanggal' => $request->tanggal,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'SPK berhasil diupdate.');
    }

    /**
     * Hapus SPK
     */
    public function destroy(ProductionOrder $productionOrder)
    {
        $productionOrder->delete();

        return redirect()->back()->with('success', 'SPK berhasil dihapus.');
    }

    /**
     * Lihat BOM SPK
     */
   public function calculateBom($id)
{
    $productionOrder = ProductionOrder::with([
        'product.boms.material'
    ])->findOrFail($id);


    $qtyProduksi = $productionOrder->qty;


    $materials = [];


    foreach ($productionOrder->product->boms as $bom) {

        $kebutuhan = 
            $bom->qty_per_pcs * $qtyProduksi;


        $waste = 
            $kebutuhan * ($bom->waste / 100);


        $total = 
            $kebutuhan + $waste;


        $materials[] = [

            'material_id' => $bom->material_id,

            'nama_material' =>
                $bom->material->nama,

            'qty' => $total,

            'satuan' =>
                $bom->material->satuan
        ];
    }


    return response()->json([
        'spk' => $productionOrder->nomor_spk,
        'product' => $productionOrder->product->nama,
        'qty_produksi' => $qtyProduksi,
        'materials' => $materials
    ]);
}
}