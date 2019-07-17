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
  public function customer_service_meta(){
    return $this->hasOne(CustomerServiceMeta::class);
  }
  public function job(){
    return $this->hasOne(Payment::class);
  }
  public function payment(){
    return $this->hasOne(Payment::class);
  }
  public function service(){
    return $this->hasOne(Service::class);
  }
}
