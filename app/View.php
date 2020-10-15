<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class View extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     * 
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'board_id',
        'look',
    ];

    /* Relationships */

    //하나의 댓글은 여러개의 좋아요,싫어요를 가짐
    public function board()
    {
        return $this->belongsTo(Comment::class);
    }
    //한 유저는 여러가지 글에 좋아요, 싫어요를 할 수 있음
    //한 유저는 여러 게시글의 조회수를 가짐
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}