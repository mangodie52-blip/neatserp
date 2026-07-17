<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Bom;

class Product extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'customer',
        'warna',
        'ukuran',
        'kategori',
        'keterangan',
    ];

    public function boms()
{
    return $this->hasMany(Bom::class);
}
}