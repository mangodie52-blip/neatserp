<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productions', function (Blueprint $table) {
            $table->id();

            $table->string('spk_no')->unique();
            $table->string('po_id');
            $table->date('po_date')->nullable();
            $table->string('model');
            $table->string('line');
            $table->integer('qty_awal');
            $table->integer('qty_akhir')->default(0);
            $table->date('deadline');

            $table->enum('status', [
                'Pending',
                'Production',
                'Finished'
            ])->default('Pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productions');
    }
};