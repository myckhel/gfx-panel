<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerServiceMeta extends Model
{
    //
    public function services(){
      return $this->belongsTo(Service::class);
    }

    public function customers(){
      return $this->belongsTo(Customer::class);
    }
}
