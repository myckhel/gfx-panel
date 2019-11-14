<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Model;
use App\Customer;
use Faker\Generator as Faker;
use App\UserCustomer;

$factory->define(UserCustomer::class, function (Faker $faker) {
    return [
      'customer_id' => Customer::inRandomOrder()->first()->id,
      'user_id' => User::inRandomOrder()->first()->id,
    ];
});
