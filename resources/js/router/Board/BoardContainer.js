import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";
export const BoardContext = createContext();

export default () => {

    // const { setUser } = useContext(AppContext);
    // const [user, setUser] = useState(false);                            //로그인 유저
    const [categories, setCategories] = useState(false);                    //카테고리
    const [boards, setBoards] = useState(false);                        //게시글
    const [board_categories, setBoard_categories] = useState(false);    //게시글에 해당하는 카테고리
    const [board_users, setBoard_users] = useState(false);              //게시글 작성 유저 정보

    useEffect( () => {
        Axios.get('/board_get').then(res => {
            console.log(res);

            setBoards(res.data.boards.data);
            setBoard_categories(res.data.board_categories);
            setCategories(res.data.categories);
            setBoard_users(res.data.board_users);
        })
    }, [])
    // console.log(boards);
    // console.log(board_categories);
    // console.log(categories);
    console.log(board_users);
    return (
        <BoardContext.Provider value={{
            boards,
            board_categories,
            categories,
            board_users,
        }}>
            <BoardView/>
        </BoardContext.Provider>
    );
}