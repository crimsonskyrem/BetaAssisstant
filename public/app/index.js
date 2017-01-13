import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router'
import IndexHello from './Components/IndexHello';
import NotFound from './Components/NotFound';
import Usr from './Components/Usr';

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={IndexHello} />
            <Route path="/usr/:id" component={Usr} />
            <Route path="/*" component={NotFound}/>
        </Router>
    ),
    document.getElementById('app')
);
