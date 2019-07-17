<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
  protected $fillable = [ 'name' ];

  public static function addNew($request){
    return self::create([ 'name' => $request->name ]);
  }

  public static function checkUnique($filed, $request){
    return self::where($filed, $request->$filed)->first();
  }
  // relationship
  // public function customer_service_meta(){
  //   return $this->hasMany(CustomerServiceMeta::class);
  // }
  public function service_metas(){
    return $this->belongsTo(ServiceMeta::class);
  }
  // public function services(){
  //   return $this->hasMany(Service::class);
  // }
  // public function customer_service_metas(){
  //   return $this->belongsToMany(CustomerServiceMeta::class);
  // }
  public function customer_service(){
    return $this->belongsTo(CustomerService::class);
  }
  // public function jobs(){
  //   return $this->hasMany(Job::class);
  // }
}
