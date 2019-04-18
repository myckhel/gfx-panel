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
    return $this->hasMany(CustomerServiceMeta::class);
  }

  public function payments(){
    return $this->hasMany(Payment::class);
  }
}
