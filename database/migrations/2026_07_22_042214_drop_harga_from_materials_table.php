<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('materials', 'harga')) {

            Schema::table('materials', function (Blueprint $table) {
                $table->dropColumn('harga');
            });
        }
    }

    public function down(): void
    {
        if (!Schema::hasColumn('materials', 'harga')) {

            Schema::table('materials', function (Blueprint $table) {
                $table->decimal('harga', 15, 2)->nullable();
            });
        }
    }
};
