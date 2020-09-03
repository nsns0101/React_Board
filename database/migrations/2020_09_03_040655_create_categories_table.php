<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('카테고리 번호');
            $table->string('category')->comment('카테고리명');
            $table->timestamps();

        });
    }
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
