<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MaterialRequest;

class UpdatePendingMaterialRequests extends Command
{
    /**
     * Nama command
     */
    protected $signature = 'app:update-pending-material-requests';

    /**
     * Deskripsi command
     */
    protected $description = 'Update MR menjadi Pending jika terlalu lama belum diproses';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $updated = MaterialRequest::where('status', 'Waiting Approval')
            ->where('created_at', '<=', now()->subHours(8))
            ->update([
                'status' => 'Pending',
            ]);

        $this->info("{$updated} MR berhasil diupdate menjadi Pending.");

        return Command::SUCCESS;
    }
}