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

    public function customer_services(){
      return $this->hasMany(CustomerService::class);
    }
}
