<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialIssue extends Model
{
    protected $fillable = [
        'nomor_issue',
        'material_request_id',
        'tanggal_keluar',
        'dikeluarkan_oleh',
        'status',
    ];

    public function materialRequest()
    {
        return $this->belongsTo(MaterialRequest::class);
    }

    public function details()
    {
        return $this->hasMany(MaterialIssueDetail::class);
    }
}