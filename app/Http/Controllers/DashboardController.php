<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use App\Models\Production;
use Inertia\Inertia;
use App\Models\ActivityLog;
use App\Models\ProductionOrder;

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


            'totalProduction' => ProductionOrder::count(),


            'productionRunning' => ProductionOrder::where('status', 'Running')
                ->count(),


            'productionFinished' => ProductionOrder::where('status', 'Finished')
                ->count(),


            'productionPending' => ProductionOrder::where('status', 'Draft')
                ->count(),


            'latestProductions' => ProductionOrder::with('product')
                ->latest()
                ->take(5)
                ->get(),


            'activities' => ActivityLog::with('user')
                ->latest()
                ->take(10)
                ->get(),


            'chartData' => $chartData,

        ]);
    }
}
