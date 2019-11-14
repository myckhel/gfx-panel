<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Meta;
use Faker\Generator as Faker;

$factory->define(Meta::class, function (Faker $faker) {
    return [
      'name' => $faker->word(5,10),
      // 'name' => $faker->word,
      'rule' => json_encode(['reuired' => true, 'min' => 3, 'max' => 80]),
    ];
});
