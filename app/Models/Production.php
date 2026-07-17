<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductionOrder;

class Production extends Model
{
    protected $fillable = [
        'spk_no',
        'po_id',
        'po_date',
        'model',
        'line',
        'qty_awal',
        'qty_akhir',
        'deadline',
        'status',
    ];

    public function productionOrders()
    {
        return $this->hasMany(ProductionOrder::class);
    }
}
