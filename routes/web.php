<?php

use Illuminate\Support\Facades\Route;

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

//홈페이지
Route::get('/', function () {
    return view('welcome');
});

//회원가입, 로그인 페이지
Route::resource('/auth/register', 'UsersController');
Route::resource('/auth/login', 'LoginController');
Route::resource('/confirm', 'ConfirmController');
Route::get('/auth/logout', 'LoginController@destroy');
//보드 페이지
Route::resource('/board', 'BoardController');
Route::get('/board_get', 'BoardController@get_boards');
