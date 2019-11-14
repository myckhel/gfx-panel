<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Customer;
use App\ServiceMeta;
use App\CustomerServiceMeta;
use Faker\Generator as Faker;

$factory->define(CustomerServiceMeta::class, function (Faker $faker) {
    return [
      'service_metas_id' => ServiceMeta::inRandomOrder()->first()->id,
      // 'customer_id' => Customer::inRandomOrder()->first()->id,
      // 'name' => $faker->unique()->firstname,
      'value' => $faker->randomNumber(5),
    ];
});
