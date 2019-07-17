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
      $this->call(CustomerTableSeeder::class);
      $this->call(ServiceMetaTableSeeder::class);
      $this->call(ServiceTableSeeder::class);
      $this->call(CustomerServiceMetaTableSeeder::class);
      $this->call(CustomerServiceTableSeeder::class);
      $this->call(PaymentTableSeeder::class);
      $this->call(JobTableSeeder::class);
    }
}
