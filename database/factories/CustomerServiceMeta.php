<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\CustomerService;
use App\CustomerServiceMeta;
use Faker\Generator as Faker;

$factory->define(CustomerServiceMeta::class, function (Faker $faker) {
    return [
      'customer_service_id' => CustomerService::inRandomOrder()->first()->id,
      'name' => $faker->unique()->firstname,
      'value' => $faker->randomNumber(5),
    ];
});
