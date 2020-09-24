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
        created_at,
        //view_count,
        //comment_count,
        //vote //좋아요, 싫어요
        Submit,
        user,
    } = useContext(BoardContext);

    const comment = [1,2];

    return user ? (
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
                        {title}
                    </span>
                    <span className="detail_date_span">
                        {created_at}
                    </span>
                </div>
                {/* 이름 및 조회수, 좋아요 수,댓글 수 표시 */}
                <div className="detail_headr_2">
                    <span className="detail_name_span">
                        {user.name}({user.email})
                    </span>
                    <span className="detail_option_span">
                        <span style={{marginRight:"10px"}}>조회 수 184</span>
                        <span style={{marginRight:"10px"}}>추천 수 12</span>
                        <span style={{marginRight:"10px"}}>댓글 수 0</span>
                    </span>
                </div>

                {/* 내용 */}
                <div className="row detail_content">
                    <p>{content}</p>
                </div>

                {/* 버튼 그룹 */}
                <div className="button_board_group">
                    {/* 글 목록 */}
                    <button className="button_board_list">
                        <img className="button_board_image" src="/icon/board_list.png"/>
                        <span>글 목록</span>
                    </button>
                    {/* 글 수정 */}
                    <button className="button_board_update">
                        <img className="button_board_image" src="/icon/board_update.png"/>
                        <span>글 수정</span>
                    </button>
                    {/* 글 삭제 */}
                    <button className="button_board_delete">
                        <img className="button_board_image" src="/icon/board_trash.png"/>
                        <span>글 삭제</span>
                    </button>
                </div>
                
                <hr style={{margin: "30px 0px", padding: 0, backgroundColor: "black", opacity: 0.3 }}/>
                
                {/* 댓글 입력 칸 */}
                <div className="row detail_comment_input">
                    <textarea 
                        className="comment_textarea"
                        name="comment"
                        placeholder="한마디를 남겨보세요!"
                    />
                    <button className="comment_button">
                        <img className="button_board_image" src="/icon/board_update.png"/>
                        {/* <span></span> */}
                    </button>
                </div>
                
                {/* 댓글 뷰 */}
                <div className="detail_comment_view">
                    { comment ? comment.map( (index, value) => {
                        return (
                            <div key={index}>
                                <div className="row detail_comment">
                                    <img className="comment_image" src="/icon/user_1.png"/>
                                    <div>
                                        <p className="comment_name">장준혁</p>
                                        <p className="comment_value">안녕하세요! 게시글 잘만드셨네요!!!</p>
                                        <p className="comment_date">2020-09-24</p>
                                    </div>
                                </div>
                                <div className="row detail_comment_reply">
                                    <img className="arrow_reply_image" src="/icon/arrow_reply_2.png"/>
                                    <img className="comment_image" src="/icon/user_1.png"/>
                                    <div>
                                        <p className="comment_name">장준혁</p>
                                        <p className="comment_value">안녕하세요! 게시글 잘만드셨네요!!!</p>
                                        <p className="comment_date">2020-09-24</p>
                                    </div>
                                </div>
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