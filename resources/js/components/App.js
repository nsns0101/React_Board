import React, {useState, useEffect, createContext} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from "react-router-dom";

import Header from "../layout/Header";
// import Footer from "../layout/Footer";
import Home from "../router/Home/HomeContainer";
import Board from "../router/Board/BoardContainer";
import Auth from "../router/Auth/AuthContainer";

export const AppContext = createContext();

export default function App() {

    // const [user, setUser] = useState(false);

    // useEffect( () => {
    //     if(localStorage.getItem('userValue')){
    //         console.log(JSON.parse(localStorage.getItem('userValue')));
    //         setUser(JSON.parse(localStorage.getItem('userValue')));
    //     }
    // },[])    
    // console.log(user);

    return (
        <AppContext.Provider value={{}}>
            <BrowserRouter>
                <Header/>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/board" component={Board}/>
                <Route path="/auth" component={Auth}/>
            </BrowserRouter>
        </AppContext.Provider>
    );
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
