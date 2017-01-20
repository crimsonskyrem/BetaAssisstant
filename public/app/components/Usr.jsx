import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton,FlatButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ContentAdd from 'material-ui/svg-icons/content/add';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Memos from './Memos';
import Todos from './Todos';
import {TODO,MEMO,SWITCH_TODO_MEMO,switchTodoMemo} from '../actions';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {usrView} from '../reducers';

const styles = {
    main:{
        margin:'10px',
    },
}

function handleTouchTap() {
    this.setState({
        view:this.state.view == TODO?MEMO:TODO
    });
}


class Usr extends Component{
    constructor(){
        super();
        injectTapEventPlugin();
        this.state = {
            view:TODO
        }
    }
    render(){
        return (
            <div style={styles.main}>
                <MuiThemeProvider>
                    <AppBar
                        title={this.state.view == TODO ?
                                    <span >TodoList</span>:
                                    <span >MemoList</span>}
                        iconElementLeft={this.state.view == TODO ?
                                            <IconButton><DateRange /></IconButton>:
                                            <IconButton><Assignment /></IconButton>}
                        iconElementRight={<IconButton><ContentAdd /></IconButton>}
                        onLeftIconButtonTouchTap={handleTouchTap.bind(this)}
                    />
                </MuiThemeProvider>
                {this.state.view == TODO ?
                    <Todos id={this.props.params.id} />:
                    <Memos id={this.props.params.id} />
                }
            </div>
       );
    }
}
export default Usr;
