import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton,FlatButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Memos from './Memos';
import TodoViewApp from '../containers/TodoViewApp';
import {TODO,MEMO,SWITCH_TODO_MEMO,switchTodoMemo} from '../actions';
import {connect} from 'react-redux';

class CombineView extends Component{
    render(){
        const {view,onSwitchClick,id} = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title={view == TODO ?
                                    <span >TodoList</span>:
                                    <span >MemoList</span>}
                        iconElementLeft={view == TODO ?
                                            <IconButton><DateRange /></IconButton>:
                                            <IconButton><Assignment /></IconButton>}
                        iconElementRight={<IconButton><ContentAdd /></IconButton>}
                        onLeftIconButtonTouchTap={()=>onSwitchClick(view)}
                    />
                </MuiThemeProvider>
                {view == TODO ?
                    <TodoViewApp id={id} />:
                    <Memos id={id} />
                }
            </div>
        );
    }
}

export default CombineView;
