<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        Schema::table('material_request_details', function (Blueprint $table) {


            $table->integer('qty_request')
                ->change();


            $table->integer('qty_approved')
                ->nullable()
                ->change();


        });

    }


    public function down(): void
    {

        Schema::table('material_request_details', function (Blueprint $table) {


            $table->decimal('qty_request',10,2)
                ->change();


            $table->decimal('qty_approved',10,2)
                ->nullable()
                ->change();


        });

    }

};