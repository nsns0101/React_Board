<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'commentable_type',
        'commentable_id',
        'user_id',
        'parent_id',
        'content',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id',
        'commentable_type',
        'commentable_id',
        'parent_id'
        ,
    ];
    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'user',
        'votes'
    ];
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'up_count',
        'down_count',
    ];
    /* Relationships */

    //유저
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //댓글관계
    public function commentable()
    {
        return $this->morphTo();
    }

    //대댓글
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->latest();
    }
    //부모
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }
    //좋아요
    public function votes() {
        return $this->hasMany(Vote::class);
    }



    
    /* Accessors */
    public function getUpCountAttribute()
    {
        return (int) $this->votes()->sum('up');
    }
    public function getDownCountAttribute()
    {
        return (int) $this->votes()->sum('down');
    }
}