<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
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
        //이메일이 있으면
        if(\App\User::whereEmail($request->email)->first()){
            return response()->json(['error' => 'users_email_unique']);
        }
        //휴대폰 번호가 있으면
        if(\App\User::wherePhone($request->phone)->first()){
            return response()->json(['error' => 'users_phone_unique']);
        }

        $user = \App\User::create([
            'email' => $request->input('email'),
            'password' => \Hash::make($request->input('password')),
            'name' => $request->input('name'),
            'birth' => $request->input('birth'),
            'gender' => $request->input('gender'),
            'phone' => $request->input('phone'),
            'confirm_code' => rand(1000,9999),  //컨펌코드
        ]);

        event(new \App\Events\UserCreated($user));
        
        return $user;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('welcome');
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
