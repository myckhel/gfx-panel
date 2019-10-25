<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CustomerServiceMeta;

class ServiceMeta extends Model
{
  protected $fillable = [ 'service_id', 'name', 'rule' ];
  //
  public function services(){
    return $this->belongsTo(Service::class, 'service_metas_id');
  }
  public function customer_service_metas(){
    return $this->hasMany(CustomerServiceMetaService::class);
  }
}
