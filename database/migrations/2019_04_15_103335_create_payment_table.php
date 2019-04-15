<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('payment', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->bigInteger('customer_id')->unsigned();
          $table->bigInteger('service_meta_id')->unsigned();
          $table->float('paid', 10, 2)->nullable();
          $table->enum('status', ['processing', 'on hold', 'pending', 'completed', 'canceled', 'failed'])->default('pending');
          $table->string('reference')->nullable();
          $table->string('authorization_code')->nullable();
          $table->string('currency_code')->nullable();
          $table->timestamp('payed_at')->nullable();
          $table->timestamps();
      });

      Schema::table('payment', function (Blueprint $table) {
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
        Schema::dropIfExists('payment');
    }
}
