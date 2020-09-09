import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";

export default () => {
    const {
        title,
        setTitle,
        category,
        setCategory,
        content,
        setContent,
        secret,
        setSecret,
        attachment,
        setAttachment,     
    } = useContext(BoardContext);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <p className="write_main_p">글 작성</p>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8" style={{borderRadius:"20px",boxShadow:"6px 6px 6px 6px rgba(0, 0, 0, .2)"}}>
                <div className="card-body">
                    <input 
                        className="title_input"
                        name ="title"
                        type="text"
                        placeholder="글 제목을 입력해주세요."
                        onChange={ e => {
                        const {
                            target: { value }
                        } = e;
                        setTitle(value);
                        }}
                    />
                </div> 
            </div>
        </div>
    )
}