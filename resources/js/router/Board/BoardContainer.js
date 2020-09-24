import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";
import Board_write from "./write/Board_write";
export const BoardContext = createContext();
import moment from "moment";

export default ({history}) => {

    // const { setUser } = useContext(AppContext);
    // const [user, setUser] = useState(false);                      //로그인 유저
    const [action, setAction] = useState(false);                     //
    const [board_count, setBoard_count] = useState(false);           //전체 게시글 수   
    const [categories, setCategories] = useState(false);             //카테고리
    const [boards, setBoards] = useState(false);                     //게시글
    const [board_categories, setBoard_categories] = useState(false); //게시글에 해당하는 카테고리
    const [board_users, setBoard_users] = useState(false);           //게시글 작성 유저 정보
    const [notice, setNotice] = useState(false);                     //공지사항
    const [pageCount, setPageCount] = useState(false);               //페이지 수
    const [category_count, setCategory_count] = useState(false);     //카테고리별 게시글 수
    const [search, setSearch] = useState(false);                     //검색어
    const [first_current_end_page, setFirst_current_end_page] = useState(1);             //현재 페이지

    const [user, setUser] = useState(false);
    const [title, setTitle] = useState(false);              //제목
    const [category, setCategory] = useState(false);        //카테고리
    const [content, setContent] = useState(false);          //내용
    const [secret, setSecret] = useState(false);            //비밀 글 여부
    const [attachment, setAttachment] = useState(false);    //첨부파일
    const [created_at, setCreated_at] = useState(false);
    //view_count,
    //comment_count,
    //vote  //좋아요, 싫어요 배열
    
    //홈페이지
    const board_get = (url) => {
        Axios.get(url).then(res => {
            console.log(res);
            
            setBoard_count(res.data.board_count);
            setBoards(res.data.boards.data);
            setBoard_categories(res.data.board_categories);
            setCategories(res.data.categories);
            setBoard_users(res.data.board_users);
            setNotice(res.data.notice);
            setCategory_count(res.data.category_count);

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

            setCategories(res.data.categories);

        })
    }
    
    // 글 디테일페이지
    const board_detail = (id) => {
        Axios.get(`/board/detail/${id}`).then(res => {
            console.log(res);

            setUser(res.data.detail_user);
            setTitle(res.data.detail_board.title);
            setCategory(res.data.category);
            setContent(res.data.detail_board.content);
            // setSecret(res.data);
            // setAttachment(res.data);
            setCreated_at(moment(res.data.detail_board.created_at).format("YYYY-MM-DD"));
        })
    }

    useEffect( () => {
        if(location.pathname.split("/")[2] == "write"){
            console.log("write");
            setAction("write"); //글 작성
            board_write();
        }
        //Number형으로 바꿔도 옳은 값이면 => 게시글 detail
        else if(location.pathname.split("/")[2] && Number(location.pathname.split("/")[2])){
            console.log("detail");
            setAction("detail");
            board_detail(location.pathname.split("/")[2])
        }
        else {
            console.log("home");
            setAction("home");  //홈
            board_get("board_get");
        }
    }, [location.pathname]);


    const Submit = (form) => {
        if(form == "write"){
            const body = {
                title : title,
                category : category,
                content : content,
                secret : secret,
            }
            const config = {
                headers: {
                  'Content-Type' : 'application/json'
                }
              }
            Axios.post("/board", body, config).then( res => {
                console.log(res);

                if(res.data.status){
                    history.push("/board");
                }
            })
        }
    }

    const Board_delete = (board_id) => {
        Axios.delete(`/board/${board_id}`).then( res => {
            console.log(res);

            //삭제되면
            if(res.data.status){
                console.log("yes delete");
            }
            // 삭제 안되면
            else {
                console.log("no delete");
            }
        })
        
    }
    // console.log(action);
    // console.log(board_count);
    // console.log(boards);
    // console.log(board_categories);
    // console.log(categories);
    // console.log(board_users);
    // console.log(pageCount);
    // console.log(board_users);
    // console.log(boards.length);
    // console.log(search);
    // console.log(first_current_end_page);
    // console.log(secret);

    // console.log(category);
    // console.log(title);
    // console.log(content);
    // console.log(created_at);
    // console.log(user);


    //board_users의 렌더링이 늦어서 갯수가 달라지면 오류가 뜨기때문에 에러처리
    return action && boards.length == board_users.length  ? (
        <BoardContext.Provider value={{
            history,
            action,
            setAction,
            board_count,
            board_get,
            boards,
            board_categories,
            categories,
            board_users,
            notice,
            pageCount,
            category_count,
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
            created_at,
            Submit,
            user
        }}>
            <BoardView/>
        </BoardContext.Provider>
    ) : null;
}