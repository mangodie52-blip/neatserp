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
        'user_id',
        'activity',
        'description',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productionOperations()
    {
        return $this->hasMany(
            ProductionOperation::class
        );
    }
}
