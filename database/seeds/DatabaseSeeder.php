<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      // $this->call(CustomerTableSeeder::class);
      // $this->call(UserSeeder::class);
      // $this->call(MetaSeeder::class);
      // $this->call(ServiceTableSeeder::class);
      // $this->call(ServiceMetaTableSeeder::class);
      // $this->call(CustomerServiceMetaTableSeeder::class);
      // $this->call(CustomerServiceTableSeeder::class);
      // $this->call(PaymentTableSeeder::class);
      // $this->call(WorkTableSeeder::class);
      $this->call(UserCustomerSeeder::class);
    }
}
