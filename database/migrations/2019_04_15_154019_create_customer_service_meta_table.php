<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerServiceMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('customer_service_meta', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->bigInteger('customer_id')->unsigned();
          $table->bigInteger('service_id')->unsigned();
          $table->string('name');
          $table->string('value');
          $table->timestamps();
      });

      Schema::table('customer_service_meta', function (Blueprint $table) {
        $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
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
        Schema::dropIfExists('customer_service_meta');
    }
}
