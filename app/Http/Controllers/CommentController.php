<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, \App\Board $board)
    {
        \Log::info($request->all());
        //로그인 하지 않은 경우
        if(!$request->user()){
            return response()->json([
                'status' => false,
                'error' => "비로그인 상태"
            ]);
        }

        $comment = $board->comments()->create(array_merge(
            $request->all(),
            ['user_id' => $request->user()->id]
        ));
        \Log::info($comment);

        $comments = $board->comments()->with('replies')->whereNull('parent_id')->latest()->get();

        return response()->json([
            'status' => true,
            'comment' => $comment,
            'comments' => $comments,
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
        //한 주문의 모든 주문 디테일
        // $order_total = \App\Order_detail::whereOrder_id($order_id)->get();
        // $order_total_price = 0;
        
        // for($i = 0; i < count($order_total); $i++){
        //   //해당하는 상품가격 * 상품개수
        //   $price = \App\Product::whereProduct_id($order_total[i]->product_id)->first()->product_price * $order_total[i]->order_product_quantity;
        
        //   $order_total_price += $price;
        // }
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
    public function update(Request $request, \App\Board $board, \App\Comment $comment)
    {
        \Log::info($comment);
        \Log::info($request);

        //댓글 수정
        $comment->update($request->all());
        //댓글 데이터 다시 뿌리기
        $comments = $board->comments()->with('replies')->whereNull('parent_id')->latest()->get();


        return response()->json([
            'status' => true,
            'comments' => $comments,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(\App\Board $board, \App\Comment $comment)
    {
        // \Log::info($board);
        // \Log::info($comment);
        $comment->delete();
        $comments = $board->comments()->with('replies')->whereNull('parent_id')->latest()->get();
        return response()->json([
            'status' => true,
            'comments' => $comments
        ]);
    }
}
