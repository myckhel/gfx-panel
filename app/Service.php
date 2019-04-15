<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
    // relationship
    public function customer_services(){
      return $this->hasMany(CustomerService::class);
    }
}
