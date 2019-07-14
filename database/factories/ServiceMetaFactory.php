<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Service;
use App\ServiceMeta;
use Faker\Generator as Faker;

$factory->define(ServiceMeta::class, function (Faker $faker) {
    return [
      'service_id' => Service::inRandomOrder()->first()->id,
      'name' => $faker->word(5,10),
      'value' => $faker->randomNumber(5),
      'charge' => '+'.$faker->randomNumber(3),
    ];
});
