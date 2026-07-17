<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('material_request_details', function (Blueprint $table) {


            $table->id();


            $table->foreignId('material_request_id')
                  ->constrained()
                  ->cascadeOnDelete();


            $table->foreignId('material_id')
                  ->constrained()
                  ->cascadeOnDelete();


            // kebutuhan material dari BOM
            $table->decimal('qty_request',10,2);


            // jumlah yang disetujui gudang
            $table->decimal('qty_approved',10,2)
                  ->default(0);


            $table->timestamps();

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('material_request_details');
    }

};