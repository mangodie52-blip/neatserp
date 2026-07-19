<?php

namespace App\Http\Controllers;

use App\Models\ProductionOperation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperationCenterController extends Controller
{

    public function index()
    {

        $operations = ProductionOperation::with([
                'productionOrder.product',
                'operation'
            ])
            ->orderBy('id','desc')
            ->get();


        return Inertia::render(
            'Production/OperationCenter',
            [
                'operations'=>$operations
            ]
        );

    }

}