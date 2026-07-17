<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GudangController extends Controller
{
    public function index()
    {
        return Inertia::render('Gudang/Index', [
            'requests' => [],
        ]);
    }
}