<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Job;
use App\Service;
use App\Customer;
use App\CustomerServiceMeta;
use Faker\Generator as Faker;

$factory->define(Job::class, function (Faker $faker) {
    return [
      'customer_id' => Customer::inRandomOrder()->first()->id,
      'service_id' => Service::inRandomOrder()->first()->id,
      'customer_service_metas_id' => CustomerServiceMeta::inRandomOrder()->first()->id,
      'status' => $faker->randomElement(['processing', 'on hold', 'pending', 'completed']),
      'media' => $faker->word(10).'.jpg',
    ];
});
