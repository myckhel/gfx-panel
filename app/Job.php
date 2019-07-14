<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
  public function customer_service_meta(){
    return $this->belongs(CustomerServiceMeta::class);
  }
  public function service(){
    return $this->belongs(Service::class);
  }
  public function customer(){
    return $this->belongs(Customer::class);
  }
}
