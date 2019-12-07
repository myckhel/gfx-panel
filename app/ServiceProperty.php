<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceProperty extends Model
{
  protected $fillable = [ 'service_id', 'name', 'rule'];
  //
  public function service(){
    return $this->belongsTo(Service::class);
  }

  public function customer_properties(){
    return $this->hasMany(CustomerProperty::class);
  }
}
