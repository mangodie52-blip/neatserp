<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();

        return Inertia::render('Master/Products/Index', [
            'products' => $products
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required',
            'nama' => 'required',
        ]);

        Product::create([
            'kode' => $request->kode,
            'nama' => $request->nama,
            'customer' => $request->customer,
            'warna' => $request->warna,
            'ukuran' => $request->ukuran,
            'kategori' => $request->kategori,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->back();
    }


  
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'kode' => 'required',
            'nama' => 'required',
        ]);

        $product->update([
            'kode' => $request->kode,
            'nama' => $request->nama,
            'customer' => $request->customer,
            'warna' => $request->warna,
            'ukuran' => $request->ukuran,
            'kategori' => $request->kategori,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->back();
    }


    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back();
    }
}