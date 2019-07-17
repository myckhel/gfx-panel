<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

// use App\Job;
// use App\Payment;
use App\Customer;
use App\CustomerService;
use App\CustomerServiceMeta;
use App\Service;
use Faker\Generator as Faker;

$factory->define(CustomerService::class, function (Faker $faker) {
  return [
    // 'name' => $faker->unique()->firstname,
    'customer_id' => Customer::inRandomOrder()->first()->id,
    'customer_service_metas_id' => CustomerServiceMeta::inRandomOrder()->first()->id,
    'service_id' => Service::inRandomOrder()->first()->id,
    // 'payments_id' => Payment::inRandomOrder()->first()->id,
    // 'jobs_id' => Job::inRandomOrder()->first()->id,
    // 'price' => $faker->randomNumber(5),
  ];
});
