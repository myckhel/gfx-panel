<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Service;
use Faker\Generator as Faker;

$factory->define(Service::class, function (Faker $faker) {
  return [
    'name' => $faker->unique()->word(10),
    'price' => $faker->randomNumber(5),
    'parent' => $faker->randomElement((function(){
      if (App\Service::all()->count() > 5) {
        return App\Service::pluck('id')->toArray();
      } else {
        return [NULL];
      }
    })())
    // (App\Service::all()->count() > 5) ? App\Service::inRandomOrder()->first()->id : NULL,
  ];
});
