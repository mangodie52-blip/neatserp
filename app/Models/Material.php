<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'kategori',
        'satuan',
        'stok',
        'stok_minimum',
        'harga',
    ];
}