<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ServiceMeta;

class Meta extends Model
{
  public function service_metas(){
    return $this->belongsTo(ServiceMeta::class);
  }
}
