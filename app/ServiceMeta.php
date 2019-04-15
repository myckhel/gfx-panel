<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceMeta extends Model
{
  //
  //
  public function customer_service(){
    return $this->belongsTo(CustomerService::class);
  }
}
