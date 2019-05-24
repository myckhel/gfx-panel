<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//shared server clear cache
Route::get('/clear-cache', function() {
    return Artisan::call('cache:clear');
    // return what you want
});

// migrate db
Route::get('/db/migrate', function() {
    return Artisan::call('migrate');
});

Route::get('/app/install', function() {
  $output = [];
  $output['freshDb'] = Artisan::call('migrate:fresh');
  $output['passportInstall'] = Artisan::call('passport:install');
  $output['dbSeed'] = Artisan::call('db:seed');
  return $output;
});

Route::get('/db/migrate/fresh', function() {
  return Artisan::call('migrate:fresh');
});

Route::any('{query}',
  function() { return view('welcome'); })
  ->where('query', '.*');
// Route::view('/login','welcome');
// Route::view('/register','welcome');
// Route::view('/', 'welcome');
// Route::view('home','welcome');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
