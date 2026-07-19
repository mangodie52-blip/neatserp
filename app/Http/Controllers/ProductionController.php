<?php

namespace App\Http\Controllers;

use App\Models\Production;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionController extends Controller
{

    /**
     * Tampilkan data produksi
     */
    public function index()
    {

        $productions = ProductionOrder::orderBy('created_at')->with('product')->get();


        return Inertia::render('Produksi/Index', [

            'productions' => $productions

        ]);
    }



    /**
     * Simpan produksi baru
     */
    public function store(Request $request)
    {


        $validated = $request->validate([

            'spk_no' => 'required|string|max:50',

            'po_id' => 'required|string|max:100',

            'po_date' => 'nullable|date',

            'model' => 'required|string|max:100',

            'line' => 'required|string|max:50',

            'qty_awal' => 'required|integer|min:0',

            'qty_akhir' => 'nullable|integer|min:0',

            'deadline' => 'required|date',

            'status' => 'required|string'

        ]);


        Production::create($validated);



        return redirect()
            ->route('produksi.index')
            ->with('success', 'Data produksi berhasil ditambahkan');
    }





    /**
     * Update data produksi
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'spk_no' => 'required|string|max:50',
            'po_id' => 'required|string|max:100',
            'po_date' => 'nullable|date',
            'model' => 'required|string|max:100',
            'line' => 'required|string|max:50',
            'qty_awal' => 'required|integer|min:0',
            'qty_akhir' => 'nullable|integer|min:0',
            'deadline' => 'required|date',
            'status' => 'required|string',
        ]);

       
        

        $production->update($validated);

        return redirect()->route('produksi.index');
    }





    /**
     * Hapus produksi
     */
    public function destroy($id)
    {
        $production = Production::findOrFail($id);

        $production->delete();

        return redirect()->route('produksi.index');
    }
}
