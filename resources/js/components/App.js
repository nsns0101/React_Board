import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from "react-router-dom";

import Header from "../layout/Header";
// import Footer from "../layout/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            {/* <Route path="/" exact={true} component={Home}/>
            <Route path="/auth" component={Login}/>
            <Route path="/service" exact={true} component={Service}/>
            <Route path="/service/create" component={Create}/>     
            <Route path="/service/response" component={Response}/> 
            <Route path="/market" component={Market}/>    */}
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
