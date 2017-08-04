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

Route::get('/game', function () {
    return view('game');
});


Route::post('/game', ['as' => 'app.game.store', 'uses' => 'GameController@store']);


Route::get('/score', ['as' => 'app.game.index', 'uses' => 'GameController@scores']);

//Route::post('/typing', ['as' => 'app.game.store', 'uses' => 'GameController@store']);

