import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Main from './mytest';

const App = () => (
        <MuiThemeProvider>
            <MyAwesomeReactComponent />
        </MuiThemeProvider>
);

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
