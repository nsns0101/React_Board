import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";
import { AppContext } from "../../components/App";
import Axios from "axios";

export const BoardContext = createContext();

export default () => {

    // const { setUser } = useContext(AppContext);
    const [user, setUser] = useState(false); 

    useEffect( () => {
        Axios.get('/board_get').then(res => {
            console.log(res);
        })
    }, [])
    return (
        <BoardContext.Provider value={{

        }}>
            <BoardView/>
        </BoardContext.Provider>
    );
}