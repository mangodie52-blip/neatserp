<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialRequest extends Model
{

  protected $fillable = [
    'parent_mr_id',
    'nomor_mr',
    'production_order_id',
    'tanggal',
    'status',
    'catatan',
    'created_by',
    'approved_by',
    'approved_at',
];


    public function productionOrder()
    {
        return $this->belongsTo(
            ProductionOrder::class
        );
    }

    public function details()
    {
        return $this->hasMany(
            MaterialRequestDetail::class
        );
    }


    public function creator()
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }


    public function approver()
    {
        return $this->belongsTo(
            User::class,
            'approved_by'
        );
    }

    // parent MR (MR utama)
    public function parent()
    {
        return $this->belongsTo(MaterialRequest::class, 'parent_mr_id');
    }

    // split pending
    public function splits()
    {
        return $this->hasMany(MaterialRequest::class, 'parent_mr_id');
    }
}
