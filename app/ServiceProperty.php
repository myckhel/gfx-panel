<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceProperty extends Model
{
  public function service(){
    return $this->belongsTo(Service::class);
  }
}
