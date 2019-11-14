<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Service;
use App\ServiceMeta;
use App\Meta;
use Faker\Generator as Faker;

$factory->define(ServiceMeta::class, function (Faker $faker) {
    return [
      'service_id' => Service::inRandomOrder()->first()->id,
      'meta_id' => Meta::inRandomOrder()->first()->id,
      // 'name' => $faker->word(5,10),
      // 'rule' => 'required|min:3|max:70|string',
      // 'charge' => '+'.$faker->randomNumber(3),
    ];
});
