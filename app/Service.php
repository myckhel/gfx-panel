<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
    // relationship
    public function customer_service_meta(){
      return $this->hasMany(CustomerServiceMeta::class);
    }
    public function service_metas(){
      return $this->hasMany(ServiceMeta::class);
    }
}
