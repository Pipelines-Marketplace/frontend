import React from "react";
import ReactDom from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Detail from "../detail/Detail";
import App from "../main/App";
const routing = (
    <Router>
        <Route path='/detail' component={Detail} />
        <Route exact path='/' component={App}/>
    </Router>
);

export default routing;