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

        //존재하는 카테고리
        $category = \App\Category::get();
        \Log::info($category);

        //카테고리 검색한 게 있으면 카테고리별로 아니면 그냥 보여줌
        $query = $choice_category ? \App\Category::whereCategory($choice_category)->first()->boards() : new \App\Board;
        \Log::info($query);
        //게시판 10개 내림차순
        $boards = $query->orderBy('id', 'desc')->paginate(10);
        \Log::info($boards);

        //하나의 게시판에 해당하는 카테고리
        $board_categories = array();
        for($i = 0; $i < count($boards); $i++){
            array_push($board_categories, \App\Category::whereId($boards[$i]->category_id)->first()->category);
        }


        return response()->json([
            'status' => true,
            'boards' => $boards,
            'board_categories' => $board_categories,
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
