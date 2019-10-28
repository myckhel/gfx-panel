<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Customer;

class Job extends Model
{
  // protected $job_statuses = [
  //   // 'services',
  //   'jobs as jobs_completed' => function($q){
  //     $q->where('status', 'completed');
  //   },
  //   'jobs as jobs_pending' => function($q){
  //     $q->where('status', 'pending');
  //   },
  //   'jobs as jobs_on_hold' => function($q){
  //     $q->where('status', 'on hold');
  //   },
  //   'jobs as jobs_failed' => function($q){
  //     $q->where('status', 'failed');
  //   }
  // ];

  public static function countCompletedCustomerService(Customer $customer){
    $customer_services = $customer->customer_services->pluck('id');
    return self::where('status', 'completed')->whereIn('customer_service_id', $customer_services)->count();
  }

  public function customer_service(){
    return $this->belongsTo(CustomerService::class);
  }
  // public function customer_service_meta(){
  //   return $this->belongs(CustomerServiceMeta::class);
  // }
  // public function service(){
  //   return $this->belongs(Service::class);
  // }
  // public function customer(){
  //   return $this->belongs(Customer::class);
  // }
}
