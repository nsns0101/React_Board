<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest', ['except' => ['destroy', 'is_login'] ]);

    }
    public function is_login(){
        return \Auth::user();
    }
    
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
        $user = \App\User::whereEmail($request->email)->first();
        \Log::info($user);

        if (!$user) {
            // flash('입력하신 코드가 올바르지 않습니다. 다시 입력해 주세요.');
            $response = ['status'=> 'confirm'];        
        }
        else{
            if (!auth()->attempt($request->only('email', 'password'), $request->has('remember'))) {
                $response = ['error'=> "로그인 정보 오류"];        
            }
            else {
                $user->update([
                    'confirm_code' => null
                ]);
                $response = [
                    'status' => true,
                    'value' => $user,
                ];        

            }
        }
        return response()->json($response);    
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
    public function destroy()
    {
        \Auth::logout();
        return redirect('/');
    }
}
