<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = ['user_id', 'category_id', 'title', 'content', 'view_count'];

    protected $with = ['user'];

    //여러게시판은 한 유저를 가질 수 있음
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //한 게시판은 여러 태그를 가질 수 있음
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    //한 게시판은 여러 첨부파일을 가질 수 있음
    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
    public function views() {
        return $this->hasMany(View::class);
    }
    //
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
