<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bom extends Model
{
    protected $fillable = [
        'product_id',
        'material_id',
        'qty_per_pcs',
        'waste',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}