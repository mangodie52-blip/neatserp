<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialRequestDetail extends Model
{

    protected $fillable = [

        'material_request_id',
        'material_id',
        'qty_request',
        'qty_approved'

    ];



    public function materialRequest()
    {
        return $this->belongsTo(
            MaterialRequest::class
        );
    }



    public function material()
    {
        return $this->belongsTo(
            Material::class
        );
    }

}