<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
  return [
      'email' => $faker->unique()->safeEmail,
      // 'gfx_id' => Customer::first() ? ((Customer::latest()->first())->gfx_id)+1 : 50001,
      'firstname' => $faker->firstname,
      'lastname' => $faker->lastname,
      'phone' => $faker->unique()->phoneNumber,
      'country_code' => '+'.$faker->randomNumber(3),
      'city' => $faker->city,
      'state' => $faker->state,
      'country' => $faker->country,
      'address' => $faker->streetAddress,
  ];
});
