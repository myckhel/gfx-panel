<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerProperty extends Model
{
  public function customer(){
    return $this->belongsTo(Customer::class);
  }

  public function service_property(){
    return $this->belongsTo(ServiceProperty::class);
  }
}
