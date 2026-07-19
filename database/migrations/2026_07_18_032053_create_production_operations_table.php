<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_operations', function (Blueprint $table) {


            $table->id();


            // hubungan ke SPK
            $table->foreignId('production_order_id')
                ->constrained()
                ->cascadeOnDelete();


            // hubungan ke proses
            $table->foreignId('operation_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->enum('status', [
                'Waiting',
                'Running',
                'Finished',
                'Hold'
            ])
            ->default('Waiting');


            $table->integer('qty_target')
                ->default(0);


            $table->integer('qty_good')
                ->default(0);


            $table->integer('qty_reject')
                ->default(0);


            $table->timestamp('start_time')
                ->nullable();


            $table->timestamp('finish_time')
                ->nullable();


            $table->string('operator')
                ->nullable();


            $table->timestamps();

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('production_operations');
    }
};