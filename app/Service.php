<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
    // relationship
    public function customer_service(){
      return $this->hasMany(CustomerService::class);
    }

    public function customer_service_meta(){
      return $this->hasMany(CustomerServiceMeta::class);
    }
}
