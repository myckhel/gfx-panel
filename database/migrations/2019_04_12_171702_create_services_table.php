<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('services', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->bigInteger('service_id')->unsigned()->nullable();
        $table->string('name', 40)->unique();
        $table->float('price', 10, 2)->nullable();
        $table->string('charge')->nullable();
        $table->timestamps();
      });//

     Schema::table('services', function (Blueprint $table) {
       $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
     });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('services');
    }
}
