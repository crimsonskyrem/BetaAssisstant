import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import SwitchCombineView from '../containers/SwitchCombineView';
import switchTodoMemo from '../reducers/switchTodoMemo';

let store = createStore(switchTodoMemo);

class Usr extends Component{
    constructor(){
        super();
        injectTapEventPlugin();
    }
    render(){
        return (
            <Provider store = {store}>
                <SwitchCombineView id={this.props.params.id} />
            </Provider>
       );
    }
}
export default Usr;


