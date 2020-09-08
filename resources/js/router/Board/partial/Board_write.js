import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";

export default () => {
    const {

    } = useContext(BoardContext);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                good
            </div>
        </div>
    )
}