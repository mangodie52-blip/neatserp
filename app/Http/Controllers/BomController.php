<?php

namespace App\Http\Controllers;

use App\Models\Bom;
use App\Models\Product;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BomController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/Bom/Index', [
            'boms' => Bom::with(['product', 'material'])
                ->latest()
                ->get(),

            'products' => Product::latest()->get(),

            'materials' => Material::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id'  => 'required|exists:products,id',
            'material_id' => 'required|exists:materials,id',
            'kebutuhan'   => 'required|numeric|min:0',
            'satuan'      => 'required|string|max:20',
            'waste'       => 'nullable|integer|min:0',
        ]);

        $exists = Bom::where('product_id', $validated['product_id'])
            ->where('material_id', $validated['material_id'])
            ->exists();

        if ($exists) {
            return back()->with('error', 'Material sudah ada pada Product ini.');
        }

        Bom::create([
            'product_id'  => $validated['product_id'],
            'material_id' => $validated['material_id'],
            'kebutuhan'   => $validated['kebutuhan'],
            'satuan'      => $validated['satuan'],
            'waste'       => $validated['waste'] ?? 0,
        ]);
        return back()->with('success', 'BOM berhasil disimpan.');
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
