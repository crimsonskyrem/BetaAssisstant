import React, {Component} from 'react';
import { createStore,applyMiddleware } from 'redux';
import userReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CombineApp from '../containers/CombineApp';

const store = createStore(userReducer,
                        applyMiddleware(thunkMiddleware)
            );

class Usr extends Component{
    constructor(){
        super();
        injectTapEventPlugin();
    }
    render(){
        return (
            <Provider store = {store}>
                <MuiThemeProvider>
                    <CombineApp usrId={this.props.params.usrId} />
                </MuiThemeProvider>
            </Provider>
       );
    }
}
export default Usr;


