<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     // service_id = gotv
     // sevice_meeta_name = gotvMax
    // service_meta_price = $200
    public function up()
    {
      Schema::create('service_meta', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->bigInteger('service_id')->unsigned();
        $table->string('name');
        $table->float('price', 10, 2);
        $table->timestamps();
      });

      Schema::table('service_meta', function (Blueprint $table) {
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
        Schema::dropIfExists('service_meta');
    }
}
