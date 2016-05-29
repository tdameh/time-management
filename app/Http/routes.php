<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function()
{
    Route::post('login', 'AuthenticateController@login');

    Route::group(['middleware' => 'jwt.auth'], function()
    {
        Route::post('logout', 'AuthenticateController@logout');
        Route::resource('user', 'UserController');
        Route::resource('task', 'TaskController');
    });
});
