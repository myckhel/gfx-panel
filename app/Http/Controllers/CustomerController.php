<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Work;
use App\User;
use App\Payment;
use App\Service;
use App\Customer;
use App\CustomerServiceMeta;

class CustomerController extends Controller
{
  public function payments(Request $request, $customer){
    // dd($customer);
    $customer = Customer::findOrFail($customer);
    $histories = $customer->payments()->get();
    // dd($histories);

    return ['status' => true, 'message' => null, 'histories' => $histories];
  }

  public function jobs(Request $request, $customer){
    // dd($customer);
    $customer = Customer::findOrFail($customer);
    $histories = $customer->jobs()->get();
    // dd($histories);

    return ['status' => true, 'message' => null, 'histories' => $histories];
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
   public function index(Request $request)
   {
     $user = $request->user();// auth()->user();
     $customer = $user->customers();
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
       'firstname'    => 'required|max:35|min:3',
       'lastname'     => 'string|max:35|min:3',
       'phone'        => 'unique:customers,phone|numeric|min:6',//|max:15',
       'email'        => 'email|unique:customers,email',
       'country_code' => 'required',
       'city'         => 'max:45',
       'state'        => 'max:45',
       'address'      => 'nullable',
       'country'      => 'nullable'
     ]);

    $user = $request->user();
     // check unique email
     // if (Customer::checkUnique('email', $request)) {
     //   return ['status' => false, 'message' => 'Email Exists'];
     // }
     // check unique phone
     // if (Customer::checkUnique('phone', $request)) {
     //   return ['status' => false, 'message' => 'Phone Exists'];
     // }
     try {
       $customer = Customer::addNew($request);

       $user->customers()->attach($customer->id);
         // [
         // 'address'          => $request->address,
         //  'city'            => $request->city,
         //  'country'         => $request->country,
         //  'country_code'    => $request->country_code,
         //  'email'           => $request->email,
         //  'firstname'       => $request->firstname,
         //  'lastname'        => $request->lastname,
         //  'phone'           => $request->phone,
         //  'state'           => $request->state,
      // ]
      // );
       return ['status' => true, 'message' => 'Customer Added Successfully', 'customer' => $customer];
     } catch (\Exception $e) {
       return ['status' => false, 'message' => $e->getMessage()];
     }
   }
   /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($customer)
   {
     $this->authorize('view', $customer);
     return $customer;
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
     $request->validate([
      'ids' => 'required'
     ]);

     $text = [];  $ids = $request->ids;
     if ($ids) {
       foreach ($ids as $id) {
         if ($customer = Customer::find($id) ) {
           $customer->delete();
         } else {
           $text[] = $id;
         }
       }
       return ['status' => true, 'message' => $text];
     }
     return ['status' => false, 'message' => 'Invalid Request Data'];
   }

   public function profile($customer){
     $this->authorize('view', $customer);
     $profile = $customer->jobsStatusCount();
     return ['profile' => $profile];
   }

   public function properties(Customer $customer){
     $this->authorize('view', $customer);
     // return
     $props = [];
     $customer_services = $customer->services()->with(['properties.service_metas.metas', 'properties', 'service'])->get();
     $customer_services->map(function($cs) use(&$props){
       // $props[] = $cs->properties;
       $props[$cs->service->name] = $cs->properties;
       // array_merge($props, $cs->properties->toArray());
     });
     // ->properties()->get();
     return [$props, $customer_services];
   }

}
