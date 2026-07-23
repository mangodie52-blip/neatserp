<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('material_issues', function (Blueprint $table) {

            $table->id();

            $table->string('nomor_issue')->unique();

            $table->foreignId('material_request_id')
                ->constrained()
                ->onDelete('cascade');

            $table->date('tanggal_keluar');

            $table->foreignId('dikeluarkan_oleh')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('status')->default('Issued');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('material_issues');
    }
};