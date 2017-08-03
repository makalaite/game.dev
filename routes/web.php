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

//Route::get('/score', function () {
//    return view('score');
//});


Route::get('/typing', ['as' => 'app.game.index', 'uses' => 'GameController@index']);
//Route::get('/score', ['as' => 'app.game.index', 'uses' => 'GameController@index']);

