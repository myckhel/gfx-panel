<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('customer_services', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('name', 40);
        $table->bigInteger('service_id')->unsigned();
        $table->bigInteger('customer_id')->unsigned();
        $table->float('price', 10, 2)->nullable();
        $table->timestamps();
      });
      Schema::table('customer_services', function (Blueprint $table) {
        $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_services');
    }
}
