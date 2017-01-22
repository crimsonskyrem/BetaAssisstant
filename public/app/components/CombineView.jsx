import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton,FlatButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Memos from './Memos';
import Todos from './Todos';
import {TODO,MEMO,SWITCH_TODO_MEMO,switchTodoMemo} from '../actions';
import {connect} from 'react-redux';

const styles = {
    main:{
        margin:'10px',
    },
}

class CombineView extends Component{
    render(){
        const {view,onSwitchClick} = this.props;
        return (
            <div style={styles.main}>
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
                    <Todos id={this.props.id} />:
                    <Memos id={this.props.id} />
                }
            </div>
        );
    }
}

export default CombineView;
