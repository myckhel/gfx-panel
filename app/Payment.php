<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    //
    public function customer_service(){
      return $this->belongsTo(CustomerService::class);
    }

    public function customer(){
      return $this->belongsTo(CustomerService::class);
    }
}
