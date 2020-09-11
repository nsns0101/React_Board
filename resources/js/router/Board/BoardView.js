import React, {useState, useContext} from "react";
import "./Board.css";
import { BoardContext } from "./BoardContainer";
import Board_home from "./home/Board_home";
import Board_write from "./write/Board_write";
import Board_detail from "./detail/Board_detail";
export default () => {
    const {
        action
    } = useContext(BoardContext);

    return action && action == "home" ? ( 
        // <span class="hit">New</span>
        <Board_home/>
    ) : action == "write" ? (
        <Board_write/>
    ) : action == "detail" ? (
        <Board_detail/>
    ) : null
}