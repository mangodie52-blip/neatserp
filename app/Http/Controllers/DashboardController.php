<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use App\Models\Production;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Data produksi
        $productions = Production::orderBy('created_at')->get();

        // Data untuk grafik progress produksi
        $chartData = $productions->map(function ($item) {

            $progress = 0;

            if ($item->qty_awal > 0) {
                $progress = round(($item->qty_akhir / $item->qty_awal) * 100);
            }

            return [
                'spk'      => $item->spk_no,
                'progress' => $progress,
                'status'   => $item->status,
            ];
        });

        return Inertia::render('Dashboard', [

            'user' => $request->user(),

            'totalMaterial' => Material::count(),

            'totalProduction' => Production::count(),

            'productionRunning' => Production::where('status', 'Production')->count(),

            'productionFinished' => Production::where('status', 'Finished')->count(),

            'productionPending' => Production::where('status', 'Pending')->count(),

            'latestProductions' => Production::latest()->take(5)->get(),

            // Data grafik
            'chartData' => $chartData,

        ]);
    }
}