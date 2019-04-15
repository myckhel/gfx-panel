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
        $table->bigInteger('service_id')->unsigned();
        $table->bigInteger('customer_id')->unsigned();
        $table->bigInteger('service_meta_id')->unsigned();
        $table->timestamps();
      });

      Schema::table('customer_services', function (Blueprint $table) {
        $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        $table->foreign('service_meta_id')->references('id')->on('service_meta')->onDelete('cascade');
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
