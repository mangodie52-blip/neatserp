<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('material_requests', function (Blueprint $table) {

            $table->id();

            $table->string('nomor_mr')->unique();

            $table->foreignId('production_order_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('tanggal');

            $table->enum('status', [
                'Pending',
                'Approved',
                'Rejected'
            ])->default('Pending');

            $table->text('catatan')->nullable();

            $table->foreignId('created_by')
                ->constrained('users');

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('approved_at')
                ->nullable();

            $table->timestamps();
        });
    }


    public function down(): void
{
    Schema::dropIfExists('material_requests');
}
};
