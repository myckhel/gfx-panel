<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
  protected $fillable = [ 'gfx_id', 'firstname', 'lastname', 'email', 'phone', 'state', 'city','address','country'];

  public static function addNew($request){
    $lastIndex = self::latest()->first();
    return self::create([
      // 'gfx_id' => $lastIndex ? (int) $lastIndex->gfx_id+ 1 : 50001,
      'firstname' => $request->firstname,
      'lastname' => $request->lastname,
      'email' => $request->email,
      'phone' => $request->phone,
      'state' => $request->state,
      'city' => $request->city,
      'address' => $request->address,
      'country' => $request->country,
    ]);
  }

  public static function checkUnique($field, $request){
    return self::where($field, $request->$field)->first();
  }

  // relationship
  public function customer_services(){
    return $this->hasMany(CustomerService::class);
  }
  public function customer_service_meta(){
    return $this->hasMany(CustomerServiceMeta::class);
  }
  //
  // public function payments(){
  //   return $this->hasMany(Payment::class);
  // }
  //
  // public function jobs(){
  //   return $this->hasMany(Job::class);
  // }
}
