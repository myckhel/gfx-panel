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
        $table->bigInteger('customer_id')->unsigned();
        // $table->string('name', 40);
        $table->bigInteger('service_id')->unsigned();
        $table->bigInteger('customer_service_metas_id')->unsigned()->nullable();
        // $table->bigInteger('payments_id')->unsigned();
        // $table->bigInteger('jobs_id')->unsigned();
        // $table->float('price', 10, 2)->nullable();
        $table->timestamps();
      });
      Schema::table('customer_services', function (Blueprint $table) {
        $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
        $table->foreign('service_id')->references('id')->on('services')->onDelete('restrict');
        $table->foreign('customer_service_metas_id')->references('id')->on('customer_service_metas')->onDelete('set null');
        // $table->foreign('payments_id')->references('id')->on('payments')->onDelete('cascade');
        // $table->foreign('jobs_id')->references('id')->on('jobs')->onDelete('cascade');
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
