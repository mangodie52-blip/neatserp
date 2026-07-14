<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {

            $table->id();

            $table->string('kode')->unique();
            $table->string('nama');
            $table->string('customer')->nullable();
            $table->string('warna')->nullable();
            $table->string('ukuran')->nullable();
            $table->string('kategori')->nullable();
            $table->text('keterangan')->nullable();

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};