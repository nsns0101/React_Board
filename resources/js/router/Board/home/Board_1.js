import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import moment  from "moment";

export default () => {
    const {
        board_get,
        boards,
        board_categories,
        board_users,
        notice,
        pageCount,
        setAction,
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
                            {notice ? notice.map( (value, index) => {
                                return (
                                    <tr key={index} style={{color:"red", fontWeight:"bold", backgroundColor:"#e8e8e8"}}>
                                        {/* {board_categories[index] = "공지"} */}
                                        <td>{notice[index].id}</td>
                                        <td>공지</td>
                                        <td style={{textAlign:"left", cursor:"pointer"}}>
                                            <Link to={`/board/${notice[index].id}`} onClick={()=>setAction("detail")}>
                                                {notice[index].title}
                                            </Link>
                                        </td>
                                        <td>이재영</td>
                                        <td>{moment(notice[index].created_at).format("YYYY-MM-DD")}</td>
                                        <td>{notice[index].view_count}</td>
                                    </tr>
                                )
                            }) : null}
                            {boards && board_categories && board_users ? boards.map( (value, index) => {
                                return (
                                    <tr key={index}>
                                        {/* {board_categories[index] = "공지"} */}
                                        <td>{boards[index].id}</td>
                                        <td>{board_categories[index]}</td>
                                        <td style={{textAlign:"left", cursor:"pointer"}}>
                                            <Link to={`/board/${boards[index].id}`} onClick={()=>setAction("detail")}>
                                                {boards[index].title}
                                            </Link>
                                        </td>
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