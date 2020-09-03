import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default () => {
    return (
        <div className="body-inner">
		    <header id="header" className="header-one">
                <nav className="site-navigation navigation navdown">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10">
							<div className="site-nav-inner">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>

								<div className="collapse navbar-collapse navbar-responsive-collapse">
                                    <ul className="nav navbar-nav">
                                        <Link to="/">
                                            <img src="/icon/title2.png" style={{width:"180px", marginBottom:"3px", marginRight:"80px"}}/>
                                        </Link>
                                        <li><Link style={{fontSize:"18px", padding:"12px"}} to="/">Home</Link></li>
                                        <li><Link style={{fontSize:"18px", padding:"12px"}} to="/board">Board</Link></li>

                                        {/*  */}
                                    </ul>
                                    <ul className="nav navbar-nav" style={{listStyle:"none", float:"right"}}>
                                        <li><Link style={{fontSize:"20px", padding:"12px"}} to="/auth/login">Login</Link></li>
                                    </ul>
								</div>

							</div>

						</div>
                        
                     </div>
                </nav>
            </header>
        </div>
    )
}