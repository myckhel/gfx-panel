<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
   public function index(Request $request)
   {
     // return ['user' => $request->user('api')];
     // return ['user' => auth()->user('api')];
     $customer = Customer::with('customer_service.customer_service_metas');
     $search = $request->search;
     if ($search) {
       $customer = $customer->where('firstname', 'LIKE', '%'.$search.'%')->orWhere('lastname', 'LIKE', '%'.$search.'%')
       ->orWhere('phone', 'LIKE', '%'.$search.'%')->orWhere('email', 'LIKE', '%'.$search.'%');
     }
     return $customer->orderBy(($request->orderBy ? $request->orderBy : 'created_at'), 'DESC')->paginate($request->pageSize);
   }
   /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function create(Request $request)
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
     $request->validate([
       'firstname' => 'required|max:35|min:3',
       'lastname' => 'string|max:35|min:3',
       'phone' => 'unique:customers|numeric|min:10|max:15',
       'email' => 'email|unique:customers',
       'country_code' => '',
       'city' => 'min:3|max:45',
       'state' => 'min:3|max:45',
       'address' => 'nullable',
       'country' => 'nullable'
     ]);

     // check unique email
     if (Customer::where('email', $request->email)->first()) {
       return ['status' => false, 'text' => 'Email Exists'];
     }
     // check unique phone
     if (Customer::where('phone', $request->phone)->first()) {
       return ['status' => false, 'text' => 'Phone Exists'];
     }
     $lastIndex = Customer::latest()->first();
     try {
       $customer = Customer::create([
         'gfx_id' => $lastIndex ? (int) $lastIndex->gfx_id+ 1 : 50001,
         'firstname' => $request->firstname,
         'lastname' => $request->lastname,
         'email' => $request->email,
         'phone' => $request->phone,
       ]);
       return ['status' => true, 'customer' => $customer];
     } catch (\Exception $e) {
       return ['status' => false, 'text' => $e->getMessage()];
     }
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
     return Customer::find($id);
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
     return Customer::findOrFail($id);
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
       $customer = Customer::findOrFail($id);
       return $customer->update($request->all());
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
     $customer = Customer::find($id);
     if ($customer) {
       $customer->delete();
       return ['status' => true];
     }
     return ['status' => false];
   }

   public function delete(Request $request)
   {
     //
     $text = [];  $ids = $request->ids;
     foreach ($ids as $id) {
       if ($customer = Customer::find($id) ) {
         $customer->delete();
       } else {
         $text[] = $id;
       }
     }
     return ['status' => true, 'text' => $text];
   }

   // public function validate (Request $request){
   //   return $request->validate([
   //       // 'name' => 'required|string',
   //       'email' => 'required|string|email|unique:users',
   //       // 'password' => 'required|string|confirmed',
   //       // 'password_confirmation' => 'required|string|min:6'
   //   ], [
   //       // 'password.confirmed' => 'The password does not match.'
   //   ]);
   // }
}
