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
    } = useContext(BoardContext);
    return (
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <p className="write_main_title">글 작성</p>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8" style={{borderRadius:"20px",boxShadow:"6px 6px 6px 6px rgba(0, 0, 0, .2)"}}>
                <div className="row card-body">
                    {/* 제목 */}
                    <div className="col-md-8">
                        <span className="write_main_p" style={{color:"black"}}>제목</span>
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
                    {/* 비밀 글 여부 */}
                    <div className="col-md-4">
                        <label className="row" style={{fontSize:"18px", float:"right", marginRight:"30px"}}>
                            <input 
                                type="checkbox" 
                                className="option-input"
                                style={{border:0, outline: 0}}
                                onClick ={()=> setSecret(!secret)}
                            />
                            <p style={{margin:"12px 5px", fontSize: "20px", fontWeight: "bold"}}>비밀 글 여부</p>
                        </label>
                    </div>
                    
                    {/* 카테고리 선택 */}
                    <div className="col-md-12 category_dropdown">
                        <span className="write_main_p" style={{color:"black"}}>카테고리</span>
                        <Dropdown options={categories} style={{zIndex:"9999"}}
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
                        <textarea className="write_textarea" rows="2" cols="20" wrap="hard"
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
                        
                    </div>
                </div> 
            </div>
        </div>
    )
}