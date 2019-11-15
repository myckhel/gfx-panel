<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\CustomerProperty;
use App\CustomerService;
use App\CustomerServiceMeta;
use Faker\Generator as Faker;

$factory->define(CustomerProperty::class, function (Faker $faker) {
    return [
      'customer_service_id' => CustomerService::inRandomOrder()->first()->id,
      'customer_service_meta_id' => CustomerServiceMeta::inRandomOrder()->first()->id,
    ];
});
