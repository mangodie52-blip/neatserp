<?php

namespace App\Services;

use App\Models\Product;

class BomCalculator
{
    public function calculate(Product $product, $qtyPermintaan)
    {
        $results = [];

        foreach ($product->boms as $bom) {

            $material = $bom->material;

            // Total kebutuhan material
            $totalKebutuhan = 
                $bom->kebutuhan * $qtyPermintaan;


            // Konversi kemasan
            $jumlahKemasan = 0;

            if ($material->isi_kemasan > 0) {
                $jumlahKemasan =
                    $totalKebutuhan / $material->isi_kemasan;
            }


            $results[] = [

                'material_id' => $material->id,

                'material' => $material->nama,

                'kebutuhan_per_pcs' => $bom->kebutuhan,

                'qty_permintaan' => $qtyPermintaan,

                'total_kebutuhan' => $totalKebutuhan,

                'isi_kemasan' => $material->isi_kemasan,

                'jumlah_kemasan' => $jumlahKemasan,

                'satuan' => $bom->satuan,

                'waste' => $bom->waste,

            ];
        }


        return $results;
    }
}