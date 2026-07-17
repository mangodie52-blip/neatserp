<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrder extends Model
{

    protected $fillable = [
        'nomor_spk',
        'product_id',
        'qty',
        'tanggal',
        'status',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
