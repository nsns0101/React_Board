<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardsTable extends Migration
{
    public function up()
    {
        Schema::create('boards', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('게시판 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->unsignedBigInteger('category_id')->comment('카테고리 번호');
            $table->string('title')->comment('게시판 제목');
            $table->text('content')->comment('게시판 내용');
            $table->bigInteger('view_count')->comment('조회수')->default(0);
            $table->timestamps();


            $table->foreign('user_id')->references('id')->on('users')->onUpdete('cascade')->onDelete('cascade');
        });
    }

    public function down()
    {
        
        Schema::dropIfExists('boards');
    }
}
