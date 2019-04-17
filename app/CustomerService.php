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

  public function services(){
    return $this->belongsTo(Service::class);
  }

  public function service_metas(){
    return $this->hasMany(ServiceMeta::class);
  }

  public function payments(){
    return $this->hasMany(Payment::class);
  }
}
