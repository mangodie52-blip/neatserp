<?php

namespace App\Helpers;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class ActivityHelper
{
    public static function log(
    $module,
    $action,
    $description,
    $referenceType = null,
    $referenceId = null
) {
    ActivityLog::create([
        'module'         => $module,
        'action'         => $action,
        'description'    => $description,
        'reference_type' => $referenceType,
        'reference_id'   => $referenceId,
        'user_id'        => Auth::id(),
    ]);
}