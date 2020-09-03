import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from "react-router-dom";

import Header from "../layout/Header";
// import Footer from "../layout/Footer";
import Home from "../router/Home/HomeContainer";
import Board from "../router/Board/BoardContainer";
import Auth from "../router/Auth/AuthContainer";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/board" component={Board}/>
            <Route path="/auth" component={Auth}/>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
