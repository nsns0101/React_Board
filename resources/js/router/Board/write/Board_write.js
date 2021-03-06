import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../BoardContainer";
import Dropdown from "react-dropdown";

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
        categories,
        Board_create,
        Board_update,
        action   
    } = useContext(BoardContext);

    return (
        <div className="row justify-content-center">

            {/* 백그라운드 이미지 */}
            <div className="board_image">
                <p className="board_image_p">
                    Board
                </p>
            </div>

            <div className="col-md-8 text-center">
                <p className="write_main_title">{action == "write" ? "글 작성" : "글 수정"}</p>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8" style={{borderRadius:"20px",boxShadow:"6px 6px 6px 6px rgba(0, 0, 0, .2)", marginBottom:"60px"}}>
                <div className="row card-body">
                    {/* 제목 */}
                    <div className="col-md-8">
                        <span className="write_main_p" style={{color:"black"}}>제목</span>
                        <input 
                            className="title_input"
                            name ="title"
                            type="text"
                            placeholder="글 제목을 입력해주세요."
                            value={title ? title : ""}
                            onChange={ e => {
                            const {
                                target: { value }
                            } = e;
                                setTitle(value);
                            }}
                        />
                    </div>
                    {/* 비밀 글 여부 */}
                    <div className="col-md-4">
                        <label className="row" style={{fontSize:"18px", float:"right", marginRight:"10px"}}>
                            <input 
                                type="checkbox" 
                                className="option-input"
                                style={{border:0, outline: 0}}
                                // value={secret ? true : false}
                                checked = {
                                    secret
                                }
                                onChange ={()=> setSecret(!secret)}
                            />
                            <p style={{margin:"12px 5px", fontSize: "20px", fontWeight: "bold"}}>비밀 글 여부</p>
                        </label>
                    </div>
                    {/* 카테고리 선택 */}
                    <div className="col-md-12 category_dropdown">
                        <span className="write_main_p" style={{color:"black"}}>카테고리</span>
                        <Dropdown options={categories} value={category ? category : ""} style={{zIndex:"9999"}}
                            onChange={
                                (data) => {
                                    console.log(data.value);
                                    setCategory(data.value);
                                }
                            } value={category ? category : ""} placeholder={"선택"} style={{width:"200px"}}
                        />
                    </div>
                    {/* 내용 작성 */}
                    <div className="col-md-12">
                        <span className="write_main_p" style={{color:"black"}}>내용</span>
                        <textarea className="write_textarea" rows="2" cols="20" wrap="hard" value={content ? content : ""}
                            onChange={ e => {
                                const {
                                    target: { value }
                                } = e;
                                setContent(value);
                            }}
                        >
                        </textarea>
                    </div>

                    {/* 첨부파일 추가 */}
                    <div className="col-md-12">
                        <span className="write_main_p" style={{color:"black"}}>첨부파일 추가</span>
                        <input 
                            className="write_file" 
                            type="file" multiple="multple" encType="multipart/form-data"
                            // file={}
                            onChange={ e => {
                                // console.log(e.target.files);
                                setAttachment(e.target.files);
                            }}
                        />
                    </div>

                    <div className="col-md-12 text-center">
                        <button 
                            className="btn btn-primary"
                            onClick={
                                () => {
                                    if(action == "write"){
                                        Board_create("write");
                                    }
                                    else{
                                        Board_update(location.pathname.split("/")[2], true);
                                    }
                                }
                        }    
                        >작성하기</button>
                    </div>
                </div> 
            </div>
        </div>
    )
}