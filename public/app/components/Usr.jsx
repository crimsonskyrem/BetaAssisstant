import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import CombineViewApp from '../containers/CombineViewApp';
import userReducer from '../reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                    <CombineViewApp id={this.props.params.id} />
                </MuiThemeProvider>
            </Provider>
       );
    }
}
export default Usr;


