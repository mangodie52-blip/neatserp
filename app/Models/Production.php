<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}