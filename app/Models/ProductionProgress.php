<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductionOrder;

class ProductionProgress extends Model
{
    protected $table = 'production_progresses';

    protected $fillable = [
        'production_order_id',
        'tanggal',
        'line',
        'operator',
        'qty_selesai',
        'keterangan',
        'created_by',
    ];

    public function productionOrder()
    {
        return $this->belongsTo(ProductionOrder::class);
    }
}