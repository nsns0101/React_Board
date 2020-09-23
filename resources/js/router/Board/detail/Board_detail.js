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
    return user ? (
        <div className="row justify-content-center">
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
                
                <hr style={{margin:0}}/>
                
                {/* 댓글 칸 */}
                <div className="row detail_comment">
                </div>
            </div>
        </div>
    ) : null
}