<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('materials', function (Blueprint $table) {

            // isi per roll / box / kemasan
            $table->decimal('isi_kemasan', 12, 2)
                  ->default(1)
                  ->after('stok');
        });
    }

    public function down(): void
    {
        Schema::table('materials', function (Blueprint $table) {
            $table->dropColumn('isi_kemasan');
        });
    }
};