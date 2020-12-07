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
        $notice_views = [];
        for($i = 0; $i < count($notice); $i++){
            array_push($notice_views,count($notice[$i]->views()->get()));
        }
        // \Log::info($notice_views);

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

        //작성자
        $views = array();
        //게시글에 해당하는 카테고리
        $board_categories = array();
        //게시글 작성자 
        $board_users = array();
        
        for($i = 0; $i < count($boards); $i++){
            //조회수 얻기
            array_push($views, count(\App\View::whereBoard_id($boards[$i]->id)->get()));

            //게시글에 해당하는 카테고리 얻기
            array_push($board_categories, \App\Category::whereId($boards[$i]->category_id)->first()->category);
            //게시글 작성자 정보
            array_push($board_users, \App\User::whereId($boards[$i]->user_id)->first());
        }
        // \Log::info($views);
        // \Log::info($board_categories);
        // \Log::info($board_users);
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
            'notice_views' => $notice_views,          //공지사항의 조회수
            'category_count' => $category_count,      //각각 카테고리가 생성된 게시글 수
            'views' => $views                         //조회수
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
        \Log::info($request->user());
        // \Log::info($_FILES);
        // \Log::info($request->hasFile('files'));
        // \Log::info($request->hasFile('file'));
        // \Log::info($request->file());
        $category_id = \App\Category::whereCategory($request["category"])->first()->id;
        
        $board = \App\Board::create([
            'user_id' => \Auth::user()->id,
            'category_id' => $category_id,
            'title' => $request["title"],
            'content' => $request["content"],
            'secret' => $request["secret"]
        ]);
        
       //request안에 files가 있나?(유저가 게시글 생성시 파일을 등록했나?)
        // if ($request->hasFile('files')) {
        // if (isset($_FILES)){
        if ($request->file()) {
            //files라는 file을 files라는 변수에 담음
            $files = $request->file();

            foreach($files as $file) {
                //filter_var은 지정된 필터로 필터링을 실행함
                //filter_var(필터링할 변수, 필터)
                //Str::random을 넣는 이유는 파일 이름이 겹칠 경우를 대비
                $filename = \Str::random().filter_var($file->getClientOriginalName(), FILTER_SANITIZE_URL);
                \Log::info($filename);
                //생성
                $board->attachments()->create([
                    'filename' => $filename,
                    'bytes' => $file->getSize(),             //사이즈
                    'mime' => $file->getClientMimeType()     //형식 ex) image/png
                ]);
                //helpers.php 참조    
                // $file->move(attachments_path(), $filename);  //옮길 위치
                // $file->move(public_path('files'. DIRECTORY_SEPARATOR . 'board' .($filename ? DIRECTORY_SEPARATOR.$filename : $filename)));  //옮길 위치
                // $file->move(public_path('files'. DIRECTORY_SEPARATOR . 'board' . DIRECTORY_SEPARATOR.$filename));  //옮길 위치
                // $file->move(public_path('files/board/' . $filename));  //옮길 위치
                move_uploaded_file($file, public_path('files'. DIRECTORY_SEPARATOR . 'board'. DIRECTORY_SEPARATOR . $filename));
                //return public_path('files'.($path ? DIRECTORY_SEPARATOR.$path : $path));
            }
        }
        \Log::info($board);
        return response()->json([
            'status' => true,
            'board' => $board
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
     // detail 페이지 새로고침시 보여줄 뷰
    public function show($id)
    {
        return view('welcome');
    }

    public function board_detail(\App\Board $board){
        \Log::info($board);

        if( !($board->views()->whereUserId(\Auth::user()->id)->exists()) ){
            \Log::info("create");
            $board->views()->create([
                'user_id' => \Auth::user()->id,
                'look' => true
            ]);
        }
        //카테고리 id를 가지고 카테고리 찾기
        $category = \App\Category::whereId($board->category_id)->first()->category;
        
        //댓글
        $comments = $board->comments()->with('replies')->whereNull('parent_id')->latest()->get();
        
        // \Log::info($category);  
        // \Log::info($comments);        
        // \Log::info($board->attachments()->get());
        

        return response()->json([
            'status' => true,
            'category' => $category,
            'detail_user' => $board->user()->first(),
            'detail_board' => $board,
            'detail_views' => count($board->views()->get()),
            'detail_comments' => $comments,
            'detail_attachments' => $board->attachments()->get(),
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
        return view('welcome');
    }

    public function board_edit_data($id){
        $board = \App\Board::whereId($id)->first();
        $category = \App\Category::whereId($board->category_id)->first()->category;
        \Log::info($board);
        return response()->json([
            'status'=> true,
            'board'=> $board,
            'category'=> $category,
        ]);
    }

    public function update(Request $request, $id)
    {
        // \App\Board::whereId($id)->first();

        // return response()->json([
            
        // ]);
        \Log::info($id);
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
