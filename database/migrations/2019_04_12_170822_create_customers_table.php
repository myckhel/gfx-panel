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
        $table->bigInteger('gfx_id');
        $table->string('firstname')->nullable();
        $table->string('lastname')->nullable();
        $table->string('email', 50)->nullable()->unique();
        $table->bigInteger('phone')->unique()->unsigned()->nullable();
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
