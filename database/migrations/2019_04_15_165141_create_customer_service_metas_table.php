<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerServiceMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::create('customer_service_metas', function (Blueprint $table) {
           $table->bigIncrements('id');
           $table->bigInteger('service_metas_id')->unsigned();
           // $table->bigInteger('customer_id')->unsigned();
           // $table->string('name');
           $table->string('value');
           $table->timestamps();
       });
       Schema::table('customer_service_metas', function (Blueprint $table) {
         $table->foreign('service_metas_id')->references('id')->on('service_metas')->onDelete('cascade');
         // $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
       });
     }

     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::dropIfExists('customer_service_metas');
     }
}
