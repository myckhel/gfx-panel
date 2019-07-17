<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceMeta extends Model
{
  protected $fillable = [ 'service_id', 'name', 'price' ];
  //
  public function services(){
    return $this->hasMany(Service::class);
  }
  public function customer_service_meta(){
    return $this->hasMany(Service::class);
  }
}
