<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerServiceProperty extends Model
{
  public static function getCredantials(Customer $customer){
    return $customer->services()->with('properties')->get();
  }

  public function service_property(){
    return $this->belongsTo(ServiceProperty::class);
  }
  public function customer_service(){
    return $this->belongsTo(CustomerService::class);
  }
}
