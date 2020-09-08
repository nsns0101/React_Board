<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BoardController extends Controller
{

    public function index()
    {
        return view('welcome');
    }

    //게시판 얻기
    public function get_boards($choice_category = null){
        //검색한 카테고리
        \Log::info($choice_category);

        //토탈 게시글 수
        $board_count = count(\App\Board::get());

        //존재하는 카테고리
        $categories = array();
        for($i = 0; $i < count(\App\Category::get()); $i++){
            array_push($categories, \App\Category::get()[$i]->category);
        }
        // \Log::info($categories);
        
        //카테고리 검색한 게 있으면 카테고리별로 아니면 그냥 보여줌
        $query = $choice_category ? \App\Category::whereCategory($choice_category)->first()->boards() : new \App\Board;
        // \Log::info($query);
        
        //카테고리 == 공지인 글
        $notice = \App\Board::whereCategory_id(1)->get();
        // \Log::info($notice);

        //게시글 10 - 공지 수 내림차순
        $boards = $query->where('category_id','!=',1)->orderBy('id','desc')->paginate(10 - count($notice));
        // \Log::info($boards);

        //게시글에 해당하는 카테고리
        $board_categories = array();
        //게시글 작성자 
        $board_users = array();
        
        for($i = 0; $i < count($boards); $i++){
            //게시글에 해당하는 카테고리 얻기
            array_push($board_categories, \App\Category::whereId($boards[$i]->category_id)->first()->category);
            //게시글 작성자 정보
            array_push($board_users, \App\User::whereId($boards[$i]->user_id)->first());
        }
        // \Log::info($board_categories);
        // \Log::info($board_user);
        $category_count = array();
        for($i = 0; $i < count($categories); $i++){

            array_push($category_count, count(\App\Board::whereCategory_id($i+1)->get()));
        }
        // \Log::info($category_count);


        return response()->json([
            'status' => true,
            'board_count' => $board_count,  //전체 보드 수
            'categories' => $categories,    //존재하는 카테고리 전부
            'boards' => $boards,            //게시글(pagenate(10 - 공지사항 수))
            'board_categories' => $board_categories, //게시글에 해당하는 카테고리
            'board_users' => $board_users,  //게시글의 작성자 정보
            'notice' => $notice,    //공지사항
            'category_count' => $category_count //각각 카테고리가 생성된 게시글 수
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
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
