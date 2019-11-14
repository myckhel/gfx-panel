<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerPropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_properties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('customer_service_id')->unsigned();
            $table->bigInteger('customer_service_meta_id')->unsigned()->nullable();
            $table->timestamps();
        });
        Schema::table('customer_properties', function (Blueprint $table) {
          $table->foreign('customer_service_id')->references('id')->on('customer_services')->onDelete('cascade');
          $table->foreign('customer_service_meta_id')->references('id')->on('customer_service_metas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_properties');
    }
}
