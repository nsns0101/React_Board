<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use JWTAuth;
use JWTAuthException;

class ConfirmController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'destroy']);
    }

    public function index()
    {
        return view('welcome');
        // return view('users.confirm');
    }

    public function create()
    {
        // return view('sessions.login');
    }

    public function store(Request $request)
    {
        // \Log::info($request->all());
        $user = \App\User::whereConfirmCode($request->confirm_code)->first();

        if (!$user) {
            // flash('입력하신 코드가 올바르지 않습니다. 다시 입력해 주세요.');
            $response = ['success'=>false];        

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
            return response()->json($response);
        }
    }
}

