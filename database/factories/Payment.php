<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Payment;
use App\Customer;
use App\CustomerService;
use Faker\Generator as Faker;

$factory->define(Payment::class, function (Faker $faker) {
    return [
      'customer_id' => Customer::inRandomOrder()->first()->id,
      'customer_services_id' => CustomerService::inRandomOrder()->first()->id,
      'paid' => $faker->randomNumber(5),
      'status' => $faker->randomElement(['processing', 'on hold', 'pending', 'completed']),
      'reference' => $faker->sha1,
      'authorization_code' => $faker->sha256,
      'currency_code' => $faker->currencyCode,
    ];
});
