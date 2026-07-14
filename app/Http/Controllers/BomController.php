<?php

namespace App\Http\Controllers;

use App\Models\Bom;
use App\Models\Product;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BomController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/Bom/Index', [
            'boms' => Bom::with([
                'product',
                'material'
            ])
            ->latest()
            ->get(),

            'products' => Product::latest()->get(),

            'materials' => Material::latest()->get(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => [
                'required',
                'exists:products,id'
            ],

            'material_id' => [
                'required',
                'exists:materials,id'
            ],

            'qty_per_pcs' => [
                'required',
                'numeric',
                'min:0'
            ],

            'waste' => [
                'nullable',
                'numeric',
                'min:0'
            ],
        ]);


        // Cegah BOM double
        $exists = Bom::where('product_id', $request->product_id)
            ->where('material_id', $request->material_id)
            ->exists();


        if ($exists) {

            return redirect()
                ->back()
                ->with('error', 'Material sudah ada di BOM Product ini');

        }


        Bom::create([

            'product_id' => $validated['product_id'],

            'material_id' => $validated['material_id'],

            'qty_per_pcs' => $validated['qty_per_pcs'],

            'waste' => $validated['waste'] ?? 0,

        ]);


        return redirect()
            ->back()
            ->with('success', 'BOM berhasil disimpan');
    }


    public function destroy(Bom $bom)
    {
        $bom->delete();


        return redirect()
            ->back()
            ->with('success', 'BOM berhasil dihapus');
    }
}