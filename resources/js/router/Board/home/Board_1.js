import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import moment  from "moment";

export default () => {
    const {
        board_get,
        total_boards,
        boards,
        // boards,
        // board_categories,
        // board_users,
        // notice,
        pageCount,
        setAction,
        // views
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
                            {total_boards.notice ? total_boards.notice.map( (value, index) => {
                                return (
                                    <tr key={index} style={{color:"red", fontWeight:"bold", backgroundColor:"#e8e8e8"}}>
                                        {/* {board_categories[index] = "공지"} */}
                                        <td>{total_boards.notice[index].id}</td>
                                        <td>공지</td>
                                        <td style={{textAlign:"left", cursor:"pointer"}}>
                                            <Link to={`/board/${total_boards.notice[index].id}`} onClick={()=>setAction("detail")}>
                                                {total_boards.notice[index].title}
                                            </Link>
                                        </td>
                                        <td>이재영</td>
                                        <td>{moment(total_boards.notice[index].created_at).format("YYYY-MM-DD")}</td>
                                        <td>{total_boards.notice[index].views}</td>
                                    </tr>
                                )
                            }) : null}
                            {/* {console.log(boards)} */}
                            {/* {console.log(total_boards)} */}
                            {boards && total_boards ? boards.map( (value, index) => {
                                return (
                                    <tr key={index}>
                                        {/* {board_categories[index] = "공지"} */}
                                        <td>{boards[index].id}</td>
                                        <td>{boards[index].category}</td>
                                        <td style={{textAlign:"left", cursor:"pointer"}}>
                                            <Link to={`/board/${boards[index].id}`} onClick={()=>setAction("detail")}>
                                                {boards[index].title}
                                            </Link>
                                        </td>
                                        <td>{boards[index].user.name}</td>
                                        <td>{moment(boards[index].created_at).format("YYYY-MM-DD")}</td>
                                        <td>{boards[index].views}</td>
                                    </tr>
                                )
                            }) : null}
                    </tbody>
                </table>
            </div>

            
        </div>
    )
}