<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
  protected $fillable = [ 'name', 'price', 'charge', 'parent' ];

  public static function addNew($request){
    $create = [
      'name' => $request->name,
      'price' => $request->price,
      'charge' => $request->charge,
    ];

    if ($parent = $request->parent) {
      $service = self::findOrFail($parent);
      return $service->services()->create($create);
    }
    return self::create($create);
  }

  public static function checkUnique($filed, $request){
    return self::where($filed, $request->$filed)->first();
  }
  // relationship
  // public function customer_service_meta(){
  //   return $this->hasMany(CustomerServiceMeta::class);
  // }
  public function service_metas(){
    return $this->hasMany(ServiceMeta::class);
  }
  public function services(){
    return $this->hasMany(Service::class, 'parent');
  }
  // public function service(){
  //   return $this->belongsTo(Service::class, 'id');
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
