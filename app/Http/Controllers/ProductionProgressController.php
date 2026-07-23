<?php

namespace App\Http\Controllers;

use App\Models\ProductionOrder;
use App\Models\ProductionProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionProgressController extends Controller
{
    public function index()
    {
        $orders = ProductionOrder::with('product')
            ->latest()
            ->get();

        $progresses = ProductionProgress::with('productionOrder.product')
            ->latest()
            ->get();

        return Inertia::render('ProductionProgress/Index', [
            'orders' => $orders,
            'progresses' => $progresses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'production_order_id' => 'required|exists:production_orders,id',
            'tanggal' => 'required|date',
            'qty_selesai' => 'required|integer|min:1',
        ]);

        $progress = ProductionProgress::create([
            'production_order_id' => $request->production_order_id,
            'tanggal' => $request->tanggal,
            'line' => $request->line,
            'operator' => $request->operator,
            'qty_selesai' => $request->qty_selesai,
            'keterangan' => $request->keterangan,
            'created_by' => auth()->id(),
        ]);

        $order = $progress->productionOrder;

        $totalSelesai = $order->progresses()->sum('qty_selesai');

        if ($totalSelesai >= $order->qty) {
            $order->update(['status' => 'QC']);
        } else {
            $order->update(['status' => 'Running']);
        }

        return redirect()
            ->route('production-progresses.index')
            ->with('success', 'Progress produksi berhasil disimpan.');
    }

    public function exportCsv()
    {
        $filename = 'production-progress-' . now()->format('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=$filename",
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');

            // UTF-8 supaya Excel tidak jadi karakter aneh
            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // Header kolom
            fputcsv($handle, [
                'Tanggal',
                'No SPK',
                'Produk',
                'Line',
                'Operator',
                'Qty Selesai',
                'Keterangan',
            ]);

            $data = \App\Models\ProductionProgress::with('productionOrder.product')
                ->latest()
                ->get();

            foreach ($data as $row) {
                fputcsv($handle, [
                    $row->tanggal,
                    $row->productionOrder?->nomor_spk,
                    $row->productionOrder?->product?->nama,
                    $row->line,
                    $row->operator,
                    $row->qty_selesai,
                    $row->keterangan,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
