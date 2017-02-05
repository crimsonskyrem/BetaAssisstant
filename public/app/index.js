import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router'
import IndexHello from './components/IndexHello';
import NotFound from './components/NotFound';
import Usr from './components/Usr';

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={IndexHello} />
            <Route path="/usr/:usrId" component={Usr} />
            <Route path="/*" component={NotFound}/>
        </Router>
    ),
    document.getElementById('app')
);
