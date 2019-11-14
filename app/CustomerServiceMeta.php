<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Customer;

class CustomerServiceMeta extends Model
{
    //
    public static function getCredantials(Customer $customer){
      // return self::where('customer_id', $customer->id)->groupBy('service_metas_id', 'id', 'customer_id', 'value', 'created_at', 'updated_at')->get();
      return self::where('customer_id', $customer->id)->groupBy('service_metas_id', 'id', 'customer_id', 'value', 'created_at', 'updated_at')->get();
    }

<<<<<<< HEAD
    public function customer_service(){
      return $this->belongsTo(CustomerService::class);
=======
    public function service_metas(){
      return $this->belongsTo(ServiceMeta::class);
    }
    public function customer_services(){
      return $this->hasMany(CustomerService::class);
    }
    public function customer(){
      return $this->belongsTo(Customer::class);
>>>>>>> development
    }
    // public function jobs(){
    //   return $this->hasMany(Job::class);
    // }
}
