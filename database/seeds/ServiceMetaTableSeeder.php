<?php

use Illuminate\Database\Seeder;
use App\ServiceMeta;

class ServiceMetaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(ServiceMeta::class, 500)->create()->each(function ($service){
        $service->save();
      });
    }
}
