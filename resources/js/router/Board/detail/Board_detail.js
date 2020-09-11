import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import Dropdown from "react-dropdown";

export default () => {
    const {
        title,
        category,
        content,
        secret,
        attachment,
        categories,
        Submit,    
    } = useContext(BoardContext);
    return (
        <div className="row justify-content-center">

        </div>
    )
}