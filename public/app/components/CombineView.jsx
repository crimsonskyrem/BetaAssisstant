import React, {Component} from 'react';
import {AppBar,IconButton,FlatButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Memos from './Memos';
import TodoApp from '../containers/TodoApp';
import {TODO} from '../actions';


class CombineView extends Component{

    render(){
        const {view,addExpanded,id} = this.props;
        const {onSwitchClick,onAddClick} = this.props;
        return (
            <div>
                <AppBar
                    title={view == TODO ?
                                <span >TodoList</span>:
                                <span >MemoList</span>}
                    iconElementLeft={view == TODO ?
                                        <IconButton><DateRange /></IconButton>:
                                        <IconButton><Assignment /></IconButton>}
                    iconElementRight={<IconButton><ContentAdd /></IconButton>}
                    onLeftIconButtonTouchTap={()=>onSwitchClick(view)}
                    onRightIconButtonTouchTap={()=>onAddClick(addExpanded)}
                />
               {view == TODO ?
                    <TodoApp id={id} expanded={addExpanded} onAddClick={onAddClick}/>
                    :
                    <Memos id={id} />
                }
            </div>
        );
    }
}

export default CombineView;
