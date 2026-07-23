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
                ->onDelete('cascade');

            $table->foreignId('material_id')
                ->constrained()
                ->onDelete('cascade');

            $table->decimal('qty_request', 12, 2);
            $table->decimal('qty_approved', 12, 2)->nullable();
            $table->string('satuan', 50)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('material_request_details');
    }
};