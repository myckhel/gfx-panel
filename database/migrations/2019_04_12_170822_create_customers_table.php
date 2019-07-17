<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('customers', function (Blueprint $table) {
        $table->bigIncrements('id');
        // $table->bigInteger('gfx_id')->unique();
        $table->string('firstname', 35);
        $table->string('lastname', 35)->nullable();
        $table->string('email', 50)->nullable()->unique();
        $table->string('country_code', 5)->nullable();
        $table->string('phone', 100)->unique()->nullable();
        $table->string('city', 100)->nullable();
        $table->string('state', 100)->nullable();
        $table->text('address')->nullable();
        $table->string('country', 100)->nullable();
        $table->timestamps();
      });

        // DB::statement("ALTER TABLE customers AUTO_INCREMENT = 50000;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
