<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Job;
use App\Payment;
use App\Service;
use App\ServiceMeta;
use App\CustomerServiceMeta;

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
  public function customer_service_metas(){
    return $this->hasMany(CustomerServiceMeta::class);
  }

  public function getProfile(){
    $this->withCount(['customer_services', 'customer_service_metas']);
    $this->completed_jobs_count = Job::countCompletedCustomerService($this);
    $this->completed_payments_count = Payment::countCompletedCustomerService($this);
    $this->credentialServices = $this->credentialsWithServices();
    return $this;
  }

  public function credentialsWithServices(){
    $services = [];
    $credentials = CustomerServiceMeta::getCredantials($this);
    if ($credentials) {
      $metas = ServiceMeta::whereIn('id', $credentials->pluck('id'))->with('services')->get();
      if ($metas) {
        $i=0;
        foreach ($metas as $meta) {
          $services[$meta->services[0]->name] = [$meta->name => $credentials[$i]->value];
          $i++;
        }
      }

      // $services = ServiceMeta::whereIn('id', $credentials->pluck('id'))->with('services')->get();
    }
    return $services;
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
