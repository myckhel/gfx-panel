<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerService extends Model
{
  //
  // relationship
  public function customer(){
    return $this->belongsTo(Customer::class);
  }

  public function service(){
    return $this->belongsTo(Service::class);
  }
}
