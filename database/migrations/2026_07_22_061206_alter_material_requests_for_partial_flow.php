<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('material_requests', function (Blueprint $table) {

            // parent MR untuk split pending
            $table->foreignId('parent_mr_id')
                ->nullable()
                ->after('id')
                ->constrained('material_requests')
                ->nullOnDelete();

            // ubah status enum
            $table->enum('status', [
                'Waiting Approval',
                'Pending',
                'Partial',
                'Approved',
                'Rejected',
                'Expired',
            ])->default('Waiting Approval')->change();
        });
    }

    public function down(): void
    {
        Schema::table('material_requests', function (Blueprint $table) {

            $table->dropForeign(['parent_mr_id']);
            $table->dropColumn('parent_mr_id');

            $table->enum('status', [
                'Pending',
                'Approved',
                'Rejected',
            ])->default('Pending')->change();
        });
    }
};