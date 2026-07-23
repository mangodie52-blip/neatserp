<?php

namespace App\Http\Controllers;

use App\Models\Bom;
use App\Models\Product;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductionOrder;

class BomController extends Controller
{
    public function index()
    {
        $boms = Bom::with(['product', 'material'])
            ->latest()
            ->get()
            ->map(function ($bom) {

                // ambil SPK terakhir untuk produk ini
                $spk = ProductionOrder::where('product_id', $bom->product_id)
                    ->latest()
                    ->first();

                $qtyPermintaan = $spk ? $spk->qty : 0;

                // total kebutuhan
                $totalKebutuhan = $bom->kebutuhan * $qtyPermintaan;

                // jumlah kemasan
                $jumlahKemasan = 0;

                if ($bom->material && $bom->material->isi_kemasan > 0) {
                    $jumlahKemasan = $totalKebutuhan / $bom->material->isi_kemasan;
                }

                // tambahkan field baru untuk dikirim ke React
                $bom->qty_permintaan = $qtyPermintaan;
                $bom->jumlah_kemasan = round($jumlahKemasan, 2);

                return $bom;
            });

        return Inertia::render('Master/Bom/Index', [
            'boms' => $boms,
            'products' => Product::latest()->get(),
            'materials' => Material::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'material_id' => 'required',
            'kebutuhan' => 'required|numeric|min:0.01',
            'satuan' => 'required',
            'waste' => 'nullable|numeric|min:0',
        ]);

        Bom::create([
            'product_id'  => $request->product_id,
            'material_id' => $request->material_id,
            'kebutuhan'   => $request->kebutuhan,
            'satuan'      => $request->satuan, // ✅ simpan dari input BOM
            'waste'       => $request->waste ?? 0,
        ]);

        return back()->with('success', 'BOM berhasil disimpan');
    }

    public function destroy(Bom $bom)
    {
        $bom->delete();

        return back()->with('success', 'BOM berhasil dihapus.');
    }

    public function generate(Product $product)
    {
        $product->load('boms.material');

        return Inertia::render('Master/Bom/Generate', [
            'product' => $product,
        ]);
    }
}
