import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";
export const BoardContext = createContext();

export default () => {

    // const { setUser } = useContext(AppContext);
    // const [user, setUser] = useState(false);                            //로그인 유저
    const [board_count, setBoard_count] = useState(false);
    const [categories, setCategories] = useState(false);                    //카테고리
    const [boards, setBoards] = useState(false);                        //게시글
    const [board_categories, setBoard_categories] = useState(false);    //게시글에 해당하는 카테고리
    const [board_users, setBoard_users] = useState(false);              //게시글 작성 유저 정보
    const [notice, setNotice] = useState(false);
    const [pageCount, setPageCount] = useState(false);
    const [category_count, setCategory_count] = useState(false);

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

            const array_page = [];
            for(var i = 0; i < res.data.boards.last_page; i++){
                array_page.push(i);    //그냥 배열갯수늘릴려고
            }
            setPageCount(array_page);
        })
    }
    useEffect( () => {
        board_get("/board_get");
    }, []);
    console.log(board_count);
    // console.log(boards);
    // console.log(board_categories);
    // console.log(categories);
    // console.log(board_users);
    // console.log(pageCount);
    // console.log(board_users);
    // console.log(boards.length);

    //board_users의 렌더링이 늦어서 갯수가 달라지면 오류가 뜨기때문에 에러처리
    return boards.length == board_users.length  ? (
        <BoardContext.Provider value={{
            board_count,
            board_get,
            boards,
            board_categories,
            categories,
            board_users,
            notice,
            pageCount,
            category_count,
        }}>
            <BoardView/>
        </BoardContext.Provider>
    ) : null;
}