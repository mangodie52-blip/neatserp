<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductionProgress;

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

    public function materialRequests()
    {
        return $this->hasMany(\App\Models\MaterialRequest::class);
    }
    
    public function progresses()
    {
        return $this->hasMany(ProductionProgress::class);
    }
}
