<?php

use Illuminate\Database\Seeder;
use App\CustomerServiceMeta;

class CustomerServiceMetaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
      factory(CustomerServiceMeta::class, 500)->create()->each(function ($customer){
        $customer->save();
      });
    }
}
