<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_progresses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('production_order_id')
                ->constrained()
                ->onDelete('cascade');

            $table->date('tanggal');
            $table->string('line')->nullable();
            $table->string('operator')->nullable();
            $table->integer('qty_selesai');
            $table->text('keterangan')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_progresses');
    }
};