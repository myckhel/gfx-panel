<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ServiceMeta;

class ServiceMetaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $errors = [];
      $serviceMetas = [];
      $size = sizeof($request->name);
      // check unique name
      for ($i=0; $i < $size; $i++) {
        $price = $request->price[$i];
        $name = $request->name[$i];
        if (ServiceMeta::where('name', $name)->where('service_id', $request->service_id)->first()) {
          $errors = [$name => 'Service Exists'];
        } else {
          try {
            $serviceMeta = ServiceMeta::create([
              'service_id' => $request->service_id,
              'name' => $name,
              'price' => $price,
            ]);
            $serviceMetas[] = $serviceMeta;
          } catch (\Exception $e) {
            $errors =  [$name => $e->getMessage()];
          }
        }
      }

      return ['status' => true, 'errors' => $errors, 'serviceMetas' => $serviceMetas];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
