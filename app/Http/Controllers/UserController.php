<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Customer;

class UserController extends Controller
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
        //
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

    public function destroyCustomer(Request $request, Customer $customer)
    {
      $this->authorize('remove', $customer);
      $user = $request->user();

      $user->customers()->detach($customer);

      return ['status' => true, 'message' => trans('msg.removed')];
    }

    public function addCustomer(Request $request, Customer $customer){
      $this->authorize('add', $customer);
      $user = $request->user();
      $user->customers()->attach($customer);
      return ['status' => true, 'message' => trans('msg.added')];
    }

    public function current(Request $request)
    {
      $user = $request->user('api');
      if ($user) {
        return [ 'status' => true, 'user' => $user];
      }
      return [ 'status' => false, 'text' => 'No Authenticated User' ];
    }
}
