<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //

    // relationship
    public function services(){
      return $this->hasMany(Service::class);
    }

    public function customer_service(){
      return $this->hasMany(CustomerService::class);
    }

    public function payments(){
      return $this->hasMany(Payment::class);
    }

    public function customer_service_meta(){
      return $this->hasMany(CustomerServiceMeta::class);
    }
}
