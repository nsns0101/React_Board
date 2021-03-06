import React, {useState, useContext} from "react";
import Board_1 from "./Board_1.js";
import Board_2 from "./Board_2.js";
import Board_3 from "./Board_3.js";
import {BoardContext} from "../BoardContainer";
import { Link } from "react-router-dom";
import Board_write from "../write/Board_write.js";
import { get } from "jquery";

export default () => {
    //공지 자유 문의 팁 구매 판매
    const {
        user,
        // action,
        setAction,
        board_get,
        board_count,
        // categories,
        // category_count,
        pageCount,
        search,
        setSearch,
        total_boards,
        boards,
        first_current_end_page,
        setfirst_current_end_page
    } = useContext(BoardContext);
    return (
        <div style={{marginBottom:"50px"}}>
            {/* 백그라운드 이미지 */}
            <div className="board_image">
                <p style={{color:"white", textShadow:"black 12px 0px 3px",fontSize:"80px", paddingTop:"120px", fontWeight:"bold"}}>
                    Board
                </p>
            </div>
            
            {/* 게시글 홈 */}
            <div>
                {/* 글 */}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <p className="board_total_p">
                            Total <span style={{color:"red", fontWeight:"bold"}}>{total_boards.board_count}건</span>의 게시물
                        </p>
                    </div>
                </div>
                {/* 카테고리 선택 */}
                <div className="row justify-content-center">
                    <div className="board_category col-xl-8 col-lg-8 col-md-8">
                        {/* <Link to ="/service/create/survey"> */}
                        <div className="row card-body" style={{padding:0}}>
                            <div className="col-md-1 text-center">
                                <img className="home_icon" src="icon/home.png" onClick={() => board_get(`/board_get`)}/>
                            </div>
                            <div className="row col-md-8" style={{borderRadius:"5px", borderLeft: "1px solid #8E9799"}}>
                                {total_boards.categories ? total_boards.categories.map( (value, index) => {
                                    return (
                                        <div key={index} className="col-md-2" onClick={()=>board_get(`/${total_boards.categories[index]}/board_get`)}>
                                            <p className="category_p">{total_boards.categories[index]}<span>({total_boards.category_count[index]})</span></p>
                                        </div>
                                    )
                                }) : null}
                                
                            </div>
                            <div className="col-md-1"/>
                            <div className="col-md-2">
                                <div className="menu_box">
                                    <img className="menu_icon_1" src="icon/menu1.png"/>
                                    <img className="menu_icon_2" src="icon/menu2.png"/>
                                    <img className="menu_icon_3" src="icon/menu3.png"/>
                                </div>
                            </div>
                        </div>
                    {/* </Link> */}
                    </div>
                </div>
                
                <Board_1/>
                
                {/* 페이징 */}
                <div className="row justify-content-around">
                    <div className="col-md-8 text-center">
                        {/* First Page */}
                        <button 
                            className="btn"
                            onClick={()=> {
                                board_get(`/board_get?page=${first_current_end_page[1]}`);
                            }}
                            style={{marginRight:"3px"}}
                        >
                            <img src="/icon/arrow_back_2.png" className="arrow_icon"/>
                        </button>
                        {/* Pagenate */}
                        {pageCount ? pageCount.map( (value, index) => {
                            return (
                                <button 
                                    key={index} 
                                    className={`btn page_btn ${index+1 == first_current_end_page[0] ? "active" : "" }`}
                                    onClick={()=> {
                                        // 라라벨 Controller에서 자동으로 잡아줌
                                        board_get(`/board_get?page=${index + 1}`);
                                    }}
                                    style={{marginRight:"3px"}}
                                >    
                                    {index + 1}
                                </button>
                            )
                        }) : null}
                        {/* Last Page */}
                        <button 
                            className="btn"
                            onClick={()=> {
                                board_get(`/board_get?page=${first_current_end_page[2]}`);
                            }}
                            style={{marginRight:"3px"}}
                        >
                            <img src="/icon/arrow_next_2.png" className="arrow_icon"/>
                        </button>   

                        {/* 글 작성 버튼 */}
                        {user && user.id && (
                            <Link to="/board/write" onClick={() => setAction("write")}>
                                <button className="write_button">
                                        글 작성
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* 검색 */}
                <div className="row text-center">
                    <div className="col-md-12">
                        <input 
                            className="search_input"
                            name ="search"
                            type="text"
                            placeholder="Search"

                            onChange={ e => {
                            const {
                                target: { value }
                            } = e;
                            setSearch(value);
                            }}
                        />
                        <button 
                            className="search_button"
                            style={{}}
                            onClick={()=>board_get(`/${search}/board_get`)}
                        >검색</button>
                    </div>    
                </div>
            </div>
        </div>
    )
}