<?php

use Illuminate\Database\Seeder;
use App\Meta;

class MetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(Meta::class, 500)->create()->each(function ($meta){
        $meta->save();
      });
    }
}
