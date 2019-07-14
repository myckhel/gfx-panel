<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Service;
use App\Customer;
use App\CustomerService;
use Faker\Generator as Faker;

$factory->define(CustomerService::class, function (Faker $faker) {
  return [
    'name' => $faker->unique()->firstname,
    'service_id' => Service::inRandomOrder()->first()->id,
    'customer_id' => Customer::inRandomOrder()->first()->id,
    'price' => $faker->randomNumber(5),
  ];
});
