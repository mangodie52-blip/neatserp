<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('boms', function (Blueprint $table) {

            // tambah kolom kebutuhan
            $table->decimal('kebutuhan', 12, 4)->after('material_id');

            // ubah satuan jadi string
            $table->string('satuan', 50)->nullable()->change();

            // ubah waste jadi decimal
            $table->decimal('waste', 5, 2)->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('boms', function (Blueprint $table) {

            $table->dropColumn('kebutuhan');

            $table->integer('satuan')->change();

            $table->integer('waste')->default(0)->change();
        });
    }
};