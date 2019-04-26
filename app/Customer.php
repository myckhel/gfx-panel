<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = [ 'gfx_id', 'firstname', 'lastname', 'email', 'phone' ];

    // relationship
    public function customer_service(){
      return $this->hasMany(CustomerService::class);
    }

    public function payments(){
      return $this->hasMany(Payment::class);
    }
}
