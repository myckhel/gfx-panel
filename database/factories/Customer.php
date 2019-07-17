<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
  return [
      // 'gfx_id' => Customer::first() ? ((Customer::latest()->first())->gfx_id)+1 : 50001,
      'firstname' => $faker->firstname,
      'lastname' => $faker->lastname,
      'email' => $faker->unique()->safeEmail,
      'country_code' => '+'.$faker->randomNumber(3),
      'phone' => $faker->unique()->phoneNumber,
      'city' => $faker->city,
      'state' => $faker->state,
      'address' => $faker->streetAddress,
      'country' => $faker->country,
  ];
});
