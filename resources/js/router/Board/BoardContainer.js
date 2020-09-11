import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";
export const BoardContext = createContext();

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

    const [title, setTitle] = useState(false);              //제목
    const [category, setCategory] = useState(false);        //카테고리
    const [content, setContent] = useState(false);          //내용
    const [secret, setSecret] = useState(false);            //비밀 글 여부
    const [attachment, setAttachment] = useState(false);    //첨부파일
    
    const board_get = (url) => {
        if(location.pathname.split("/")[2] == "write"){
            setAction("write"); //글 작성
        }
        else {
            setAction("home");  //홈
        }

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
    useEffect( () => {
        board_get("/board_get");
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
    // console.log(title);
    // console.log(content);


    //board_users의 렌더링이 늦어서 갯수가 달라지면 오류가 뜨기때문에 에러처리
    return action && boards.length == board_users.length  ? (
        <BoardContext.Provider value={{
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
            Submit,
        }}>
            <BoardView/>
        </BoardContext.Provider>
    ) : null;
}