<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Service;
use App\ServiceMeta;
use Faker\Generator as Faker;

$factory->define(Service::class, function (Faker $faker) {
  return [
    'parent' => $faker->randomElement((function(){
      if (App\Service::count() > 5) {
        return App\Service::pluck('id')->toArray();
      } else {
        return [NULL];
      }
    })()),
    // 'service_metas_id' => ServiceMeta::inRandomOrder()->first()->id,
    'name' => $faker->unique()->word(10),
    'price' => $faker->randomNumber(4),
    'charge' => $faker->randomElement(['+', '*']).$faker->randomNumber(3),
    // 'logo' => $faker->word(10),
    // (App\Service::all()->count() > 5) ? App\Service::inRandomOrder()->first()->id : NULL,
  ];
});
