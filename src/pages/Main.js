import React from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex'
// import ArticleList from './ArticleList'

const Main = () => {
    return(
        <div>
        <Router>
            <Route path = "/" exact  component = {Login}  />
            <Route path = "/index/" component = {AdminIndex}/>
            {/* <Router path = "/index/add/:id" component = {ArticleList}/> */}
        </Router>
        </div>
    )
};

export default Main;