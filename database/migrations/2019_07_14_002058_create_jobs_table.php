<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('jobs', function (Blueprint $table) {
        $table->bigIncrements('id');
        // $table->bigInteger('customer_id')->unsigned();
        // $table->bigInteger('service_id')->unsigned();
        $table->bigInteger('customer_service_id')->unsigned();
        $table->enum('status', ['processing', 'on hold', 'pending', 'completed', 'canceled', 'failed'])->default('pending');
        $table->string('media')->nullable();
        $table->timestamps();
      });

     Schema::table('jobs', function (Blueprint $table) {
       // $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
       // $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
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
        Schema::dropIfExists('jobs');
    }
}
