<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CustomerProperty;

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
  public function properties(){
    return $this->belongsToMany(CustomerServiceMeta::class, 'customer_properties');
  }
  public function job(){
    return $this->hasOne(Work::class);
  }
  public function payment(){
    return $this->hasOne(Payment::class);
  }
  public function service(){
    return $this->belongsTo(Service::class);
  }
}
