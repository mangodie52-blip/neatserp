<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialIssueDetail extends Model
{
    protected $fillable = [
        'material_issue_id',
        'material_id',
        'qty_keluar',
        'satuan',
    ];

    public function materialIssue()
    {
        return $this->belongsTo(MaterialIssue::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}