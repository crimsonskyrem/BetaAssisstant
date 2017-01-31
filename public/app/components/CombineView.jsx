import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton,FlatButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Drawer from 'material-ui/Drawer';
import Memos from './Memos';
import TodoViewApp from '../containers/TodoViewApp';
import {TODO,MEMO,SWITCH_TODO_MEMO,switchTodoMemo} from '../actions';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class CombineView extends Component{
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

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
                        onRightIconButtonTouchTap={()=>this.handleToggle()}
                    />
                </MuiThemeProvider>
                {view == TODO ?
                    <TodoViewApp id={id} />:
                    <Memos id={id} />
                }
                <MuiThemeProvider>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                    <MenuItem onTouchTap={()=>this.handleClose()}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={()=>this.handleClose()}>Menu Item 2</MenuItem>
                </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default CombineView;
