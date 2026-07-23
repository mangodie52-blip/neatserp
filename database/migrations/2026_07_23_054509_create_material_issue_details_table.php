<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('material_issue_details', function (Blueprint $table) {

            $table->id();

            $table->foreignId('material_issue_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('material_id')
                ->constrained()
                ->onDelete('cascade');

            $table->decimal('qty_keluar', 12, 4);

            $table->string('satuan');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('material_issue_details');
    }
};