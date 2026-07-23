<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use App\Models\Production;
use App\Models\ProductionOrder;
use App\Models\User;
use App\Models\ActivityLog;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\MaterialRequest;


class DashboardController extends Controller
{

    public function index(Request $request)
    {

        /*
        |--------------------------------------------------------------------------
        | PRODUKSI GRAPH
        |--------------------------------------------------------------------------
        */

        $productions = Production::orderBy('created_at')->get();


        $chartData = $productions->map(function ($item) {


            $progress = 0;


            if ($item->qty_awal > 0) {

                $progress = round(
                    ($item->qty_akhir / $item->qty_awal) * 100
                );
            }


            return [

                'spk'      => $item->spk_no,

                'progress' => $progress,

                'status'   => $item->status,

            ];
        });



        /*
        |--------------------------------------------------------------------------
        | REALTIME STATUS
        |--------------------------------------------------------------------------
        */


        $realtime = [

            // sistem
            'online' => true,


            // user aktif
            'operator' => User::count(),


            // SPK berjalan
            'production_running' =>
            ProductionOrder::where('status', 'Running')
                ->count(),



            // material request gudang
            'material_request' =>
            MaterialRequest::whereIn(
                'status',
                [
                    'Waiting Approval',
                    'Approved',
                    'Partial'
                ]
            )
                ->count(),



            // stok kritis
            'stock_alert' =>
            Material::whereColumn(
                'stok',
                '<=',
                'stok_minimum'
            )
                ->count(),

        ];

        $performance = [

            "labels" => [],
            "production" => [],
            "material" => [],
            "activity" => [],

        ];


        for ($i = 10; $i >= 0; $i--) {


            $time = now()->subMinutes($i);


            $performance['labels'][] =
                $time->format('H:i');



            $performance['production'][] =
                ProductionOrder::where(
                    'status',
                    'Running'
                )
                ->count();



            $performance['material'][] =
                MaterialRequest::whereIn(
                    'status',
                    [
                        'Waiting Approval',
                        'Approved',
                        'Partial'
                    ]
                )
                ->count();



            $performance['activity'][] =
                ActivityLog::where(
                    'created_at',
                    '>=',
                    $time
                )
                ->count();
        }

        $performance = [

            "time" => collect(range(1, 10))
                ->map(function () {
                    return now()
                        ->subSeconds(rand(1, 60))
                        ->format('H:i:s');
                }),


            "production" => collect(range(1, 10))
                ->map(function () {

                    return rand(
                        ProductionOrder::count(),
                        100
                    );
                }),


            "material" => collect(range(1, 10))
                ->map(function () {

                    return rand(
                        10,
                        80
                    );
                }),

        ];




        /*
        |--------------------------------------------------------------------------
        | RETURN DASHBOARD
        |--------------------------------------------------------------------------
        */


        return Inertia::render('Dashboard', [
            'performance' => $performance,



            'user' => $request->user(),



            /*
            |--------------------------------------------------------------------------
            | KPI CARD
            |--------------------------------------------------------------------------
            */


            'totalMaterial' =>
            Material::count(),



            'totalProduction' =>
            ProductionOrder::count(),



            'productionRunning' =>
            ProductionOrder::where(
                'status',
                'Running'
            )
                ->count(),



            'productionFinished' =>
            ProductionOrder::where(
                'status',
                'Finished'
            )
                ->count(),



            'productionPending' =>
            ProductionOrder::where(
                'status',
                'Draft'
            )
                ->count(),



            'latestProductions' =>
            ProductionOrder::with('product')
                ->latest()
                ->take(5)
                ->get(),



            /*
            |--------------------------------------------------------------------------
            | LIVE ACTIVITY
            |--------------------------------------------------------------------------
            */


            'activities' =>

            ActivityLog::with('user')
                ->latest()
                ->take(10)
                ->get(),



            /*
            |--------------------------------------------------------------------------
            | GRAPH
            |--------------------------------------------------------------------------
            */


            'chartData' => $chartData,



            /*
            |--------------------------------------------------------------------------
            | REALTIME
            |--------------------------------------------------------------------------
            */


            'realtime' => $realtime,


        ]);
    }
}
