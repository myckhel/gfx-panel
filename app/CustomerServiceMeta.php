<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerServiceMeta extends Model
{
    //
    public function services(){
      return $this->belongsTo(Service::class);
    }
    public function customer_service(){
      return $this->belongsTo(CustomerService::class);
    }
    public function jobs(){
      return $this->hasMany(Job::class);
    }
}
