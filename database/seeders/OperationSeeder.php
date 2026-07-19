<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Operation;

class OperationSeeder extends Seeder
{
    public function run(): void
    {

        $operations = [

            [
                'nama_operation'=>'Cutting',
                'urutan'=>1,
            ],

            [
                'nama_operation'=>'Sewing',
                'urutan'=>2,
            ],

            [
                'nama_operation'=>'Finishing',
                'urutan'=>3,
            ],

            [
                'nama_operation'=>'QC',
                'urutan'=>4,
            ],

            [
                'nama_operation'=>'Packing',
                'urutan'=>5,
            ],

        ];


        foreach($operations as $operation){

            Operation::updateOrCreate(
                [
                    'nama_operation'=>$operation['nama_operation']
                ],
                [
                    'urutan'=>$operation['urutan'],
                    'aktif'=>1
                ]
            );

        }

    }
}