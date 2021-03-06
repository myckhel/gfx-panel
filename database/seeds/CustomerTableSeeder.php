<?php

use Illuminate\Database\Seeder;
use App\Customer;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
      factory(Customer::class, 500)->create()->each(function ($customer){
        $customer->save();
      });
    }
}
