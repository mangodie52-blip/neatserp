<?php

namespace App\Services;

class BomCalculator
{
    /**
     * Menghitung kebutuhan material.
     */
public function calculate(Request $request)

    $request->validate([
        'product_id'    => 'required|exists:products,id',
        'qty_produksi'  => 'required|numeric|min:1',
    ]);

    $boms = Bom::with('material')
        ->where('product_id', $request->product_id)
        ->get();

    $hasil = [];

    foreach ($boms as $bom) {

        $hitung = BomCalculator::calculate(
            $request->qty_produksi,
            $bom->kebutuhan,
            $bom->waste
        );

        $hasil[] = [
            'material_id'       => $bom->material_id,
            'material'          => $bom->material->nama,
            'kebutuhan'         => $bom->kebutuhan,
            'satuan'            => $bom->material->satuan, // ambil dari Master Material
            'waste'             => $bom->waste,
            'qty_material'      => $hitung['qty_material'],
            'waste_qty'         => $hitung['waste_qty'],
            'total_kebutuhan'   => $hitung['total_kebutuhan'],
        ];
    }

    return response()->json($hasil);
}