import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";

export default () => {
    const {
        boards
    } = useContext(BoardContext);
    console.log(boards);
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
                            {boards ? boards.map( (value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{boards[index].id}</td>
                                        <td>자유</td>
                                        <td style={{textAlign:"left"}}>안녕하세여 반갑습니다 저는 제목입니다.</td>
                                        <td>이재영</td>
                                        <td>2020-07-31</td>
                                        <td>4625</td>
                                    </tr>
                                )
                            }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}