<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 
        'password', 
        'name', 
        'birth', 
        'gender', 
        'phone', 
        'confirm_code',
        'remember_token', 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'confirm_code', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //한 유저는 여러개의 게시판을 가질 수 있음
    public function boards()
    {
        return $this->hasMany(Board::class);
    }
    public function views() {
        return $this->hasMany(View::class);
    }
    //한 유저는 여러개의 댓글을 쓸 수 있음
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    //한 유저는 여러개의 좋아요
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }




    //슈퍼 계정 어드민 권한(AuthServiceProvider참고)
    public function isAdmin()
    {
        return ($this->id === 1) ? true : false;
    }
}
