<?php

use Illuminate\Database\Seeder;
use App\CustomerService;

class CustomerServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
      factory(CustomerService::class, 500)->create()->each(function ($customer){
        $customer->save();
      });
    }
}
