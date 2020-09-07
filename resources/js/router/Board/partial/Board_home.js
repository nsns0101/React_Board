import React from "react";
import Board_1 from "./Board_1.js";
import Board_2 from "./Board_2.js";
import Board_3 from "./Board_3.js";


export default () => {
    const category = 
    [
        {
            value : "공지",
            count : 4
        },
        {
            value : "자유",
            count : 219
        },
        {
            value : "문의",
            count : 7
        },
        {
            value : "팁",
            count : 12
        },
        {
            value : "구매",
            count : 55
        },
        {
            value : "판매",
            count : 97
        },
    ];
    return (
        <div>
            {/* 백그라운드 이미지 */}
            <div className="board_image">
                <p style={{color:"white", textShadow:"black 12px 0px 3px",fontSize:"80px", paddingTop:"120px", fontWeight:"bold"}}>
                    Board
                </p>
            </div>
            {/* 글 */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <p className="board_total_p">
                        Total <span style={{color:"red", fontWeight:"bold"}}>0건</span>의 게시물
                    </p>
                </div>
            </div>
            {/* 카테고리 선택 */}
            <div className="row justify-content-center">
                <div className="board_category col-xl-8 col-lg-8 col-md-8">
                    {/* <Link to ="/service/create/survey"> */}
                    <div className="row card-body" style={{padding:0}}>
                        <div className="col-md-1 text-center">
                            <img className="home_icon" src="icon/home.png"/>
                        </div>
                        <div className="row col-md-8" style={{borderRadius:"5px", borderLeft: "1px solid #8E9799"}}>
                            {category.map( (value, index) => {
                                return (
                                    <div key={index} className="col-md-2">
                                        <p className="category_p">{category[index].value}<span>({category[index].count})</span></p>
                                    </div>
                                )
                            })}
                            
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

        </div>
    )
}