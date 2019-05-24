<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index(Request $request)
     {
       $service = Service::with('service_metas');
       $search = $request->search;
       if ($search) {
         $service = $service->where('name', 'LIKE', '%'.$search.'%');//->orWhere('lastname', 'LIKE', '%'.$search.'%')
         // ->orWhere('phone', 'LIKE', '%'.$search.'%')->orWhere('email', 'LIKE', '%'.$search.'%');
       }
       return $service->orderBy(($request->orderBy ? $request->orderBy : 'name'))->paginate($request->pageSize);
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
      // check unique name
      if (Service::where('name', $request->name)->first()) {
        return ['status' => false, 'text' => 'Name Exists'];
      }
      try {
        $service = Service::create([ 'name' => $request->name ]);
        return ['status' => true, 'service' => $service];
      } catch (\Exception $e) {
        return ['status' => false, 'text' => $e->getMessage()];
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
     public function show($id)
     {
       //
       return Service::find($id);
     }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
      return Service::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $service = Service::findOrFail($id);
      return $service->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
     public function destroy($id)
     {
       //
       $service = Service::find($id);
       if ($service) {
         $service->delete();
         return ['status' => true];
       }
       return ['status' => false];
     }

     public function delete(Request $request)
     {
       //
       $text = [];  $ids = $request->ids;
       foreach ($ids as $id) {
         if ($service = Service::find($id) ) {
           $service->delete();
         } else {
           $text[] = $id;
         }
       }

       return ['status' => true, 'failed' => $text];
     }
}
