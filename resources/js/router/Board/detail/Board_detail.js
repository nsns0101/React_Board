import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import Dropdown from "react-dropdown";
import moment from "moment";

export default () => {
    const {
        user,
        history,
        // setAction,
        detail_board,
        detail_comments,
        //view_count,
        //comment_count,
        //vote //좋아요, 싫어요
        // Submit,
        Board_update,
        Board_delete,
        Comment_create,
        comment,
        setComment,
    } = useContext(BoardContext);
    // console.log(detail_board);
    // console.log(detail_comments);
    // console.log(user);
    // console.log(comment);
    // const comment = [1,2];

    return detail_board.user ? (
        <div className="row justify-content-center board">
            {/* 백그라운드 이미지 */}
            <div className="board_image">
                <p style={{color:"white", textShadow:"black 12px 0px 3px",fontSize:"80px", paddingTop:"120px", fontWeight:"bold"}}>
                    Board
                </p>
            </div>

            <div className="col-md-8">
                {/* 헤더 */}
                <div className="detail_header">
                    <span className="detail_title_span">
                        {detail_board.title}
                    </span>
                    <span className="detail_date_span">
                        {moment(detail_board.created_at).format("YYYY-MM-DD")}
                    </span>
                </div>
                {/* 이름 및 조회수, 좋아요 수,댓글 수 표시 */}
                <div className="detail_headr_2">
                    <span className="detail_name_span">
                        {detail_board.user.name}({detail_board.user.email})
                    </span>
                    <span className="detail_option_span">
                        <span style={{marginRight:"10px"}}>조회 수 184</span>
                        <span style={{marginRight:"10px"}}>추천 수 12</span>
                        <span style={{marginRight:"10px"}}>댓글 수 0</span>
                    </span>
                </div>

                {/* 내용 */}
                <div className="row detail_content">
                    {detail_board.attachments && detail_board.attachments.map( (value, index) => {
                        return (
                            <img key={index} src={`/files/board/${detail_board.attachments[index].filename}`}/>
                        )
                    })}
                    <p>{detail_board.content}</p>
                </div>

                {/* 버튼 그룹 */}
                <div className="button_board_group">
                    {/* 글 목록 */}
                    <button className="button_board_list" onClick={()=> history.push("/board")}>
                        <img className="button_board_image" src="/icon/board_list.png"/>
                        <span>글 목록</span>
                    </button>
                    {user && user.id == detail_board.user.id && 
                    <Fragment>
                        {/* 글 수정 */}
                        {/* <Link to={`/board/${total_boards.notice[index].id}`} onClick={()=>setAction("detail")}>
                                                {total_boards.notice[index].title}
                                            </Link> */}
                        <Link to={`/board/${detail_board.id}/edit`} className="btn button_board_update" onClick={()=> Board_update(detail_board.id)}>
                            <img className="button_board_image" src="/icon/board_update.png"/>
                            <span>글 수정</span>
                        </Link>
                        {/* 글 삭제 */}
                        <button className="button_board_delete" onClick={()=> Board_delete(detail_board.id)}>
                            <img className="button_board_image" src="/icon/board_trash.png"/>
                            <span>글 삭제</span>
                        </button> 
                    </Fragment>
                    }
                </div>
                
                <hr style={{margin: "30px 0px", padding: 0, backgroundColor: "black", opacity: 0.3 }}/>
                
                {/* 댓글 입력 칸 */}
                <div className="row detail_comment_input">
                    <textarea 
                        className="comment_textarea"
                        name="comment"
                        placeholder="한마디를 남겨보세요!"
                        onChange={ e => {
                            setComment(e.target.value);
                        }}
                        value={comment}
                    />
                    <button className="comment_button" onClick={() => {
                        Comment_create(detail_board.id);
                        setComment("");
                    }}>
                        <img className="button_board_image" src="/icon/board_update.png"/>
                        {/* <span></span> */}
                    </button>
                </div>
                
                {/* 댓글 뷰 */}
                <div className="detail_comment_view">
                    { detail_comments ? detail_comments.map( (value, index) => {
                        return (
                            <div key={index}>
                                <div className="row detail_comment">
                                    <img className="comment_image" src="/icon/user_1.png"/>
                                    <div>
                                        <p className="comment_name">{detail_comments[index].user.name}</p>
                                        <p className="comment_value">{detail_comments[index].content}</p>
                                        <p className="comment_date">{moment(detail_comments[index].created_at).format("YYYY-MM-DD")}</p>
                                    </div>
                                </div>
                                {/* 대댓글 */}
                                {/* <div className="row detail_comment_reply">
                                    <img className="arrow_reply_image" src="/icon/arrow_reply_2.png"/>
                                    <img className="comment_image" src="/icon/user_1.png"/>
                                    <div>
                                        <p className="comment_name">장준혁</p>
                                        <p className="comment_value">안녕하세요! 게시글 잘만드셨네요!!!</p>
                                        <p className="comment_date">2020-09-24</p>
                                    </div>
                                </div> */}
                                <hr/>
                            </div>
                        )
                    }) : 
                    null}
                </div>

            </div>
        </div>
    ) : null
}