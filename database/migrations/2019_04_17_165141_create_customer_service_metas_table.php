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
           $table->bigInteger('customer_service_id')->unsigned();
           $table->string('name');
           $table->string('value');
           $table->timestamps();
       });

       Schema::table('customer_service_metas', function (Blueprint $table) {
         $table->foreign('customer_service_id')->references('id')->on('customer_services')->onDelete('cascade');
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
