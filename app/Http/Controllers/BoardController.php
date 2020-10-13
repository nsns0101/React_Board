<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function __construct()
    {
        //로그인 하지 않아도 index(게시판 홈), show(게시판 뷰)는 볼 수 있음
        $this->middleware('auth', ['except' => ['index', 'show','get_boards', 'board_detail']]);
    }

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
        
        //카테고리 == 공지인 글
        $notice = \App\Board::whereCategory_id(1)->get();
        
        //키워드 검색을 통하여 게시글을 볼 경우
        if($choice_category && !\App\Category::whereCategory($choice_category)->first()){
            \Log::info("good");
            $query = new \App\Board;
            \Log::info($query->where('title','like', '%'.$choice_category.'%')->orderBy('id','desc')->paginate(10));
            $boards = $query->where('title','like', '%'.$choice_category.'%')->orderBy('id','desc')->paginate(10);
            // if($choice_category != "공지"){
            //     $notice = [];   //카테고리 검색시 공지사항은 안보이게
            // }

        }

        //카테고리 검색을 통해 게시글을 볼 경우
        else if($choice_category){
            $query = $choice_category ? \App\Category::whereCategory($choice_category)->first()->boards() : new \App\Board;
            // \Log::info($query);
            if($choice_category != "공지"){
                $notice = [];   //카테고리 검색시 공지사항은 안보이게
            }
            $boards = $query->where('category_id','!=',1)->orderBy('id','desc')->paginate(10 - count($notice));
        }
        //홈페이지
        else{
            $query = new \App\Board;
            $boards = $query->where('category_id','!=',1)->orderBy('id','desc')->paginate(10 - count($notice));
        }
        // \Log::info($notice);

        //게시글 10 - 공지 수 내림차순
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
            'board_count' => $board_count,            //전체 보드 수
            'categories' => $categories,              //존재하는 카테고리 전부
            'boards' => $boards,                      //게시글(pagenate(10 - 공지사항 수))
            'board_categories' => $board_categories,  //게시글에 해당하는 카테고리
            'board_users' => $board_users,            //게시글의 작성자 정보
            'notice' => $notice,                      //공지사항
            'category_count' => $category_count       //각각 카테고리가 생성된 게시글 수
        ]);
    }

    public function create()
    {
        //존재하는 카테고리
        $categories = array();
        for($i = 0; $i < count(\App\Category::get()); $i++){
            array_push($categories, \App\Category::get()[$i]->category);
        }
        // \Log::info($categories);

        return response()->json([
            'status' => true,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        \Log::info($request->all());

        $category_id = \App\Category::whereCategory($request["category"])->first()->id;
        
        \App\Board::create([
            'user_id' => \Auth::user()->id,
            'category_id' => $category_id,
            'title' => $request["title"],
            'content' => $request["content"],
            'secret' => $request["secret"]
        ]);
        return response()->json([
            'status' => true
        ]);
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

    public function board_detail(\App\Board $board){
        \Log::info($board);
        //게시글 정보
        // $detail_board = \App\Board::whereId($board->id)->first();
        // \Log::info($detail_board);
        
        //카테고리 id를 가지고 카테고리 찾기
        $category = \App\Category::whereId($board->category_id)->first()->category;
        // \Log::info($category);

        //유저 id를 가지고 유저정보 찾기
        $detail_user = \App\User::whereId($board->user_id)->first();

        $comments = $board->comments()->with('replies')->whereNull('parent_id')->latest()->get();
        \Log::info($comments);

        return response()->json([
            'status' => true,
            'category' => $category,
            'detail_board' => $board,
            'detail_comments' => $comments,
            'detail_user' => $detail_user,
        ]);
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
    public function destroy(\App\Board $board)
    {
        \Log::info("delete");
        $this->authorize('board_delete', $board);
        $board->delete();
        return response()->json([
            'status' => true
        ]);
    
    }
}
