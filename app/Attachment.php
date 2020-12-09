<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'board_id',
        'filename',
        'bytes',
        'mime',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'board_id',
        'created_at',
        'updated_at',
    ];
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'url',
    ];
    
    /* Relationships */
    public function board()
    {
        return $this->belongsTo(Board::class);
    }
    /* Accessors */
    //파일의 사이즈(Byte)를 KB, MB 등으로 나타내주는 메서드 (helpers.php 참조)
    public function getBytesAttribute($value)
    {
        return format_filesize($value);
    }
    //파일의 위치를 찾아주는 메서드
    public function getUrlAttribute()
    {
        return url('files/' . $this->filename);
    }
}