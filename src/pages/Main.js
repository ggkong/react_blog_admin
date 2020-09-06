import React from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex'

const Main = () => {
    return(
        <div>
        <Router>
            <Route path = "/login/"  component = {Login}  />
            <Route path = "/index/" component = {AdminIndex}/>
        </Router>
        </div>
    )
};

export default Main;