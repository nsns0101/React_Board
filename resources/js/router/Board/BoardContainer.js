import React, {useEffect, useState, useContext, createContext} from "react";
import BoardView from "./BoardView";

export const BoardContext = createContext();

export default () => {
    return (
        <BoardContext.Provider value={{

        }}>
            <BoardView/>
        </BoardContext.Provider>
    );
}