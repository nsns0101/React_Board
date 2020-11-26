import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";
import Board_write from "./write/Board_write";
export const BoardContext = createContext();
import moment from "moment";

export default ({history}) => {
    const { user } = useContext(AppContext);

    const [action, setAction] = useState(false);                     //
    const [total_boards, setTotal_boards] = useState(false);
    // const [board_count, setBoard_count] = useState(false);           //전체 게시글 수   
    const [categories, setCategories] = useState(false);             //카테고리
    const [boards, setBoards] = useState(false);                     //게시글
    // const [board_categories, setBoard_categories] = useState(false); //게시글에 해당하는 카테고리
    // const [board_users, setBoard_users] = useState(false);           //게시글 작성 유저 정보
    // const [notice, setNotice] = useState(false);                     //공지사항
    const [pageCount, setPageCount] = useState(false);               //페이지 수
    // const [category_count, setCategory_count] = useState(false);     //카테고리별 게시글 수
    const [search, setSearch] = useState(false);                     //검색어
    const [first_current_end_page, setFirst_current_end_page] = useState(1);             //현재 페이지
    // const [views, setViews] = useState(0);

    //Write Board Infomation
    const [title, setTitle] = useState(false);              //제목
    const [category, setCategory] = useState(false);        //카테고리
    const [content, setContent] = useState(false);          //내용
    const [secret, setSecret] = useState(false);            //비밀 글 여부
    const [attachment, setAttachment] = useState(false);    //첨부파일
    // const [created_at, setCreated_at] = useState(false);    //생성날짜
    
    //Detail Board Infomation
    const [detail_board, setDetail_board] = useState(false);    //게시글 정보
    const [detail_comments, setDetail_comments] = useState(false);

    const [comment, setComment] = useState("");
    //view_count,
    //comment_count,
    //vote  //좋아요, 싫어요 배열
    // console.log(user);
    //홈페이지
    const board_get = (url) => {
        Axios.get(url).then(res => {
            console.log(res);
            
            //게시글들 각각의 정보
            let boards_infomation = res.data.boards.data;
            for(var i = 0; i < boards_infomation.length; i++){
                boards_infomation[i].views = res.data.views[i];
                boards_infomation[i].category = res.data.board_categories[i];
            }
            setBoards(boards_infomation);

            //게시글 홈의 정보
            let total_boards_infomation = {};
            total_boards_infomation.board_count = res.data.board_count;
            total_boards_infomation.categories = res.data.categories;
            total_boards_infomation.board_users = res.data.board_users;
            total_boards_infomation.notice = res.data.notice;
            total_boards_infomation.category_count = res.data.category_count;

            //공지사항의 조회수
            for(var i = 0; i < total_boards_infomation.notice.length; i++){
                total_boards_infomation.notice[i].views = res.data.notice_views[i];
            }
            
            setTotal_boards(total_boards_infomation)

            const array_page_count = [];
            for(var i = 0; i < res.data.boards.last_page; i++){
                array_page_count.push(i);    //그냥 배열갯수늘릴려고
            }
            setPageCount(array_page_count);

            setFirst_current_end_page([
                res.data.boards.current_page,
                1,
                res.data.boards.last_page
            ]);
        })
    }

    //글 작성페이지
    const board_write = () => {
        Axios.get("/board/create").then(res => {
            console.log(res);
            // 공지사항을 쓸 수 있게
            if(user.id == 1){
                setCategories(res.data.categories);
            }
            // 공지사항을 못 쓰게
            else {
                setCategories(res.data.categories.splice(1, res.data.categories.length - 1));
            }

        })
    }
    
    // 글 디테일페이지
    const board_detail = (id) => {
        Axios.get(`/board/detail/${id}`).then(res => {
            console.log(res);

            let board_obj = res.data.detail_board;

            board_obj.views = res.data.detail_views;
            board_obj.attachments = res.data.detail_attachments;
            board_obj.user = res.data.detail_user;
            board_obj.category = res.data.category;

            setDetail_board(board_obj);
            setDetail_comments(res.data.comments);
        })
    }

    useEffect( () => {
        if(location.pathname.split("/")[2] == "write"){
            // console.log("write");
            setAction("write"); //글 작성
            board_write();
        }
        //Number형으로 바꿔도 옳은 값이면 => 게시글 detail
        else if(location.pathname.split("/")[2] && Number(location.pathname.split("/")[2])){
            // console.log("detail");
            setAction("detail");
            board_detail(location.pathname.split("/")[2]);
        }
        else {
            // console.log("home");
            setAction("home");  //홈
            board_get("board_get");
        }
    }, [location.pathname]);
    
    //게시글 생성
    const Board_create = (form) => {

        if(form == "write"){
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('category', category);
            formdata.append('content', content);
            formdata.append('secret', secret);

            if(attachment){

                for(var i = 0; i <= attachment.length - 1; i++){
                    formdata.append(`file${i}`, attachment[i]);
                }
            }

            const config = {
                headers: {
                  'Content-Type' : 'multipart/form-data',
                //   'Accept' : "application/json",
                //   'type': "formData"
                }
            }
            Axios.post("/board", formdata, config).then( res => {
                console.log(res);
                console.log(res.data);
                console.log(res.data.board);

                if(res.data.status){
                    history.push("/board");
                }
            })
        }
    }

    //게시글 삭제
    const Board_delete = (board_id) => {
        // console.log(board_id);

        Axios.delete(`/board/${board_id}`).then( res => {
            console.log(res);

            //삭제되면
            if(res.data.status){
                history.push("/board");
            }
        });        
    }

    // 댓글 입력
    const Comment_create = (board_id) => {
        const body = {
            // parent_id,      //부모 댓글 id
            content: comment,         //댓글 내용
            commentable_id: board_id                  
        }
        const config = {
            headers: {
              'Content-Type' : 'application/json'
            }
        }
        //board_id는 게시글 id
        Axios.post(`/boards/${board_id}/comments`, body, config).then( res => {
            // console.log(res);
            setDetail_comments(res.data.comments);
        });
    }

    //board_users의 렌더링이 늦어서 갯수가 달라지면 오류가 뜨기때문에 에러처리
    //categories.length는 write 페이지에만 제공하는 것(write페이지에서 새로고침시 total_boards가 없으니까)
    return total_boards && action && boards.length == total_boards.board_users.length || categories.length ? (
        <BoardContext.Provider value={{
            user,
            history,
            action,
            setAction,
            total_boards,
            // board_count,
            board_get,
            boards,
            // board_categories,
            categories,
            // board_users,
            // notice,
            pageCount,
            // category_count,
            search,
            setSearch,
            first_current_end_page,
            setFirst_current_end_page,
            title,
            setTitle,
            category,
            setCategory,
            content,
            setContent,
            secret,
            setSecret,
            attachment,
            setAttachment,
            // created_at,
            Board_create,
            Board_delete,
            // user,
            detail_board,
            setDetail_board,
            detail_comments,
            setDetail_comments,
            Comment_create,
            comment,
            setComment,
            // views
        }}>
            <BoardView/>
        </BoardContext.Provider>
    ) : null;
}