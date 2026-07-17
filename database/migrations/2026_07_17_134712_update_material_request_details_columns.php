<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        Schema::table('material_request_details', function (Blueprint $table) {


            $table->renameColumn(
                'qty',
                'qty_request'
            );


            $table->dropColumn(
                'satuan'
            );


        });

    }


    public function down(): void
    {

        Schema::table('material_request_details', function (Blueprint $table) {


            $table->renameColumn(
                'qty_request',
                'qty'
            );


            $table->string('satuan')
                  ->nullable();


        });

    }

};
