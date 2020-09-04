import React, {useState, useEffect, createContext} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from "react-router-dom";

import Header from "../layout/Header";
// import Footer from "../layout/Footer";
import Home from "../router/Home/HomeContainer";
import Board from "../router/Board/BoardContainer";
import Auth from "../router/Auth/AuthContainer";

import Axios from "axios";

export const AppContext = createContext();

export default function App() {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect( () => {
        Axios.get("/get_user").then(res => {
            if(res.data.id){
                setIsLoggedIn("login");
            }
            else {
                setIsLoggedIn("logout");
            }
        })
    }, [])
    
    return isLoggedIn ? (
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <BrowserRouter>
                <Header/>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/board" component={Board}/>
                <Route path="/auth" component={Auth}/>
            </BrowserRouter>
        </AppContext.Provider>
    ) : null;
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
