<?php

namespace App\Http\Controllers;

use App\Models\MaterialIssue;
use App\Models\MaterialIssueDetail;
use App\Models\MaterialRequest;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\DB;

class MaterialIssueController extends Controller
{
    public function store(MaterialRequest $materialRequest)
    {
        // hanya MR yang sudah approved / partial
        if (!in_array($materialRequest->status, ['Approved', 'Partial'])) {
            return back()->with('error', 'MR belum bisa dikeluarkan.');
        }

        DB::transaction(function () use ($materialRequest) {

            // generate nomor issue
            $tanggal = now()->format('ymd');

            $last = MaterialIssue::latest('id')->first();

            $urutan = $last
                ? ((int) substr($last->nomor_issue, -3)) + 1
                : 1;

            $nomorIssue = 'ISS-' . $tanggal . '-' . str_pad($urutan, 3, '0', STR_PAD_LEFT);

            // header issue
            $issue = MaterialIssue::create([
                'nomor_issue' => $nomorIssue,
                'material_request_id' => $materialRequest->id,
                'tanggal_keluar' => now(),
                'dikeluarkan_oleh' => auth()->id(),
                'status' => 'Issued',
            ]);

            // detail issue
            foreach ($materialRequest->details as $detail) {

                if ($detail->qty_approved <= 0) {
                    continue;
                }

                MaterialIssueDetail::create([
                    'material_issue_id' => $issue->id,
                    'material_id' => $detail->material_id,
                    'qty_keluar' => $detail->qty_approved,
                    'satuan' => $detail->satuan,
                ]);
            }

            // update status MR
            $materialRequest->update([
                'status' => 'Issued',
            ]);

            // activity log
            ActivityLog::create([
                'user_id' => auth()->id(),
                'module' => 'Material Issue',
                'action' => 'CREATE',
                'reference_type' => 'MaterialIssue',
                'reference_id' => $issue->id,
                'activity' => 'Material keluar dari gudang',
                'description' => 'Issue ' . $issue->nomor_issue . ' untuk MR ' . $materialRequest->nomor_mr,
                'ip_address' => request()->ip(),
            ]);
        });

        return back()->with('success', 'Material berhasil dikeluarkan dari gudang.');
    }
}