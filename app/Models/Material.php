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
    'isi_kemasan', // tambahkan ini
    'stok_minimum',
];
    public function boms()
    {
        return $this->hasMany(Bom::class);
    }
}
