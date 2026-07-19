<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOperation extends Model
{
    protected $fillable = [

        'production_order_id',
        'operation_id',
        'status',
        'qty_target',
        'qty_good',
        'qty_reject',
        'start_time',
        'finish_time',
        'operator',

    ];


    public function productionOrder()
    {
        return $this->belongsTo(
            ProductionOrder::class
        );
    }


    public function operation()
    {
        return $this->belongsTo(
            Operation::class
        );
    }
}