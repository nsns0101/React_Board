import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";

export const BoardContext = createContext();

export default () => {

    // const { setUser } = useContext(AppContext);
    const [user, setUser] = useState(false); 
    const [boards, setBoards] = useState(false);
    const [board_categories, setBoard_categories] = useState(false);

    useEffect( () => {
        Axios.get('/board_get').then(res => {
            console.log(res);
            setBoards(res.data.boards.data);
            setBoard_categories(res.data.board_categories);
        })
    }, [])
    // console.log(boards);
    console.log(board_categories);
    return (
        <BoardContext.Provider value={{
            boards,
            setBoards,
            board_categories,
            setBoard_categories
        }}>
            <BoardView/>
        </BoardContext.Provider>
    );
}