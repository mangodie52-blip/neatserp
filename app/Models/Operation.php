<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
        'nama_operation',
        'urutan',
        'aktif',
    ];


    public function productionOperations()
    {
        return $this->hasMany(
            ProductionOperation::class
        );
    }
}