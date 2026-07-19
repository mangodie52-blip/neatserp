<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaterialRequest;

class MaterialController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/Material/Index', [
            'materials' => Material::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|unique:materials,kode',
            'nama' => 'required',
            'kategori' => 'required',
            'satuan' => 'required',
            'stok' => 'required|integer|min:0',
            'stok_minimum' => 'required|integer|min:0',
            'harga' => 'required|numeric',
        ]);

        Material::create($validated);

        return redirect()->route('material.index');
    }

    public function update(Request $request, Material $material)
    {
        $material->update($request->all());

        return back();
    }

    public function destroy(Material $material)
    {
        $material->delete();

        return back();
    }

  
}
