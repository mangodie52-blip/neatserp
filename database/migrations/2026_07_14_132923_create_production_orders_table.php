<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_orders', function (Blueprint $table) {

            $table->id();

            $table->string('nomor_spk')
                ->unique();

            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->integer('qty');

            $table->date('tanggal');

            $table->enum('status', [
                'draft',
                'proses',
                'selesai',
                'batal'
            ])
            ->default('draft');

            $table->timestamps();

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('production_orders');
    }
};