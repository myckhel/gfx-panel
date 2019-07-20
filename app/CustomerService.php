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
  public function customer_service_metas(){
    return $this->belongsTo(CustomerServiceMeta::class);
  }
  public function job(){
    return $this->hasOne(Job::class);
  }
  public function payment(){
    return $this->hasOne(Payment::class, 'customer_services_id');
  }
  public function service(){
    return $this->hasOne(Service::class);
  }
}
