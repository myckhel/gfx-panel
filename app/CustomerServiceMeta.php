<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Customer;

class CustomerServiceMeta extends Model
{
    //
    public function service_metas(){
      return $this->belongsTo(ServiceMeta::class);
    }
    public function customer_services(){
      return $this->hasMany(CustomerService::class);
    }
    public function customer(){
      return $this->belongsTo(Customer::class);
    }
    // public function jobs(){
    //   return $this->hasMany(Job::class);
    // }
}
