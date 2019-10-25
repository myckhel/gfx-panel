<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ServiceMeta;
use App\Service;

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

    public function ruleToString($rules, $index, $request){
      $string = '';
      $last = sizeof($rules)-1;
      foreach ($rules as $key => $rule) {
        if (in_array($rule, ['file', 'select', 'limit'])) {
          switch ($rule) {
            case 'limit':
              $min = "min_$index";
              $max = "max_$index";
              $string .= 'min:'.$request->$min.'|max:'.$request->$max;
              break;
            case 'file':
              $file = "file_$index";
              $fsize = count($request->$file);
              foreach ($request->$file as $i => $file) {
                if ($i == 0) {
                  $string .= 'file:';
                }
                $string .= $file;
                if ($i != $fsize-1) {
                  $string .= ',';
                }
              }
              break;
            case 'select':
              $name = "select_name_$index";
              $value = "select_value_$index";
              $llast = count($request->$name)-1;
              foreach ($request->$name as $i => $select) {
                if ($i == 0) {
                  $string .= 'select:';
                }
                $string .= "name-".$select.",value-".$request->$value[$i];
                if ($i != $llast) {
                  $string .= ',';
                }
              }
              break;
          }
          if ($key != $last) {
            $string .= '|';
          }
          // $string .= '|';
        } else {
          if ($rule != 'limit') {
            $string .= $rule."|";
          }
        }
      }
      return $string;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
      $request->validate([
        'service_id' => 'required',
      ]);

      $service = Service::findOrFail($request->service_id);
      $names = $request->name;

      $errors = '';
      $status = true;
      $serviceMetas = [];
      // $size = count($request->name);
      foreach ($names as $i => $name) {
      // for ($i=0; $i < $size; $i++) {
        $rule = "rule_$i";
        $rules = $request->$rule;
        // foreach ($rules as $key => $rule) {
        $ruleString = $this->ruleToString($rules, $i, $request);
        // }
        try {
          $serviceMeta = $service->service_metas()->create([
            'name' => $name,
            'rule' => $ruleString,
          ]);
          $serviceMetas[] = $serviceMeta;
        } catch (\Exception $e) {
          if (!$request->service_id) {
            $status = false;
          }
          $errors .=  $e->getMessage().'<br />';
        }
      }

        return ['status' => $status, 'errors' => $errors, 'serviceMetas' => $serviceMetas];
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
