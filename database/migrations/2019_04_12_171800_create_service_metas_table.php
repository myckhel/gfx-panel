<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::create('service_metas', function (Blueprint $table) {
         $table->bigIncrements('id');
         $table->bigInteger('service_id')->unsigned();
         $table->bigInteger('meta_id')->unsigned()->nullable();
         $table->timestamps();
       });

       Schema::table('service_metas', function (Blueprint $table) {
         $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
         $table->foreign('meta_id')->references('id')->on('metas')->onDelete('set null');
       });

     }

     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::dropIfExists('service_metas');
     }
}
