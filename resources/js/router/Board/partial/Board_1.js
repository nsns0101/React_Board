import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import moment  from "moment";

export default () => {
    const {
        boards,
        board_categories,
        board_users
    } = useContext(BoardContext);
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <table className="table table-hover .table-responsive">
                    <thead className="board_thead">
                        <tr>
                            <td>번호</td>
                            <td>카테고리</td>
                            <td>제목</td>
                            <td>글쓴이</td>
                            <td>날짜</td>
                            <td>조회 수</td>
                        </tr>
                    </thead>
                    <tbody className="col-12 board_tbody text-center">
                            {boards && board_categories && board_users ? boards.map( (value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{boards[index].id}</td>
                                        <td>{board_categories[index]}</td>
                                        <td style={{textAlign:"left"}}>{boards[index].title}</td>
                                        <td>{board_users[index].name}</td>
                                        <td>{moment(boards[index].created_at).format("YYYY-MM-DD")}</td>
                                        <td>{boards[index].view_count}</td>
                                    </tr>
                                )
                            }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}