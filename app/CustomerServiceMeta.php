<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Customer;
use App\CustomerService;

class CustomerServiceMeta extends Model
{
    //
    public static function getCredantials(Customer $customer){
      // $ids = $customer->services()->pluck('id');
      // return self::whereHas('properties', function($q) use($ids){
      //   $q->whereIn('customer_service_id', $ids);
      // })->with('properties')->get();
      return $customer->services()->with('properties')->get();
      // return self::where('customer_id', $customer->id)->groupBy('service_metas_id', 'id', 'customer_id', 'value', 'created_at', 'updated_at')->get();
    }

    public function service_metas(){
      return $this->belongsTo(ServiceMeta::class);
    }
    public function customer_services(){
      return $this->hasMany(CustomerService::class);
    }
    public function customer(){
      return $this->belongsTo(Customer::class);
    }
    public function properties(){
      return $this->belongsToMany(CustomerService::class, 'customer_properties')->withTimestamps();
    }
    // public function jobs(){
    //   return $this->hasMany(Job::class);
    // }
}
