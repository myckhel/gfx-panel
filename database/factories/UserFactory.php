<?php

use App\User;
use App\Service;
use App\Customer;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});

$factory->define(App\Customer::class, function (Faker $faker) {
    return [
        'email' => $faker->unique()->safeEmail,
        'gfx_id' => $faker->unique()->randomNumber(6),
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

$factory->define(App\Service::class, function (Faker $faker) {
    return [
      'name' => $faker->unique()->name,
      'price' => $faker->randomNumber(5),
      'parent' => (App\Service::all()->count() > 5) ? (App\Service::inRandomOrder()->first())->id : NULL,
    ];
});
