import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {ADD_TODO,
        addContentChange,addCheckCompleted,
        fetchTodos,saveTodo,toggleTodo,deleteTodo,toggleDialogView,swipeTodoTab,confirmDeleteTodo} from '../actions';
import TodoView from '../components/TodoView';
import AddTodoView from '../components/AddTodoView';
import EmptyView from '../components/EmptyView';
import FailView from '../components/FailView';

const styles = {
    list:{
        textAlign: 'center',
        minHeight: '200px'
    },
    addBlock:{
        textAlign:'left'
    },
    wait:{
        margin:'30% 0'
    }
};

class TodoApp extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        const {dispatch,usrId} = this.props;
        dispatch(fetchTodos(usrId));
    }
    render(){
        const {usrId,expanded,view,addContent,addCompleted,deleteOpen,deleteObjectId} = this.props;
        const {onAddContentChange,onAddCheckCompleted,onAddClick,onSaveClick,onSwipeTodoTab} = this.props;
        const {loading,show,fail,data,onToggleTodo,onDeleteTodo,onToggleDeleteView,onConfirmDeleteTodo} = this.props;
        const empty = ((data.length === 0) && show);
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={()=> onToggleDeleteView()}
            />,
            <FlatButton
                label="删除"
                primary={true}
                onTouchTap={()=> onConfirmDeleteTodo(deleteObjectId)}
            />,
            ];
        return (
                <div style={styles.list}>
                    <AddTodoView usrId={usrId}
                                 view={view}
                                 expanded={expanded}
                                 addContent={addContent}
                                 addCompleted={addCompleted}
                                 onAddContentChange={onAddContentChange}
                                 onAddCheckCompleted={onAddCheckCompleted}
                                 onAddClick={onAddClick}
                                 onSaveClick={onSaveClick}/>
                    {loading?<CircularProgress size={120} thickness={5} style={styles.wait} />:''}
                    {empty?<EmptyView />:''}
                    {fail?<FailView />:''}
                    {show?<TodoView data={data}
                                    onSwipeTodoTab={onSwipeTodoTab}
                                    onToggleTodo={onToggleTodo}
                                    onDeleteTodo={onDeleteTodo} />:''}
                <Dialog
                        actions={actions}
                        modal={false}
                        open={deleteOpen}
                        onRequestClose={()=> onToggleDeleteView()}
                        >
                    确定要删除吗？
                </Dialog>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading:state.todoReducer.loading,
        show:state.todoReducer.show,
        fail:state.todoReducer.fail,
        data:state.todoReducer.data,
        addContent:state.todoReducer.addContent,
        addCompleted:state.todoReducer.addCompleted,
        deleteOpen:state.todoReducer.deleteOpen,
        deleteObjectId:state.todoReducer.deleteObjectId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch,
        onAddContentChange:(e,addContent) =>
            dispatch(addContentChange(addContent)),
        onAddCheckCompleted:(e,addCompleted) =>
            dispatch(addCheckCompleted(addCompleted)),
        onSaveClick:(data) =>
            dispatch(saveTodo(data)),
        onSwipeTodoTab:(uuid,tabIndex) =>
            dispatch(swipeTodoTab(uuid,tabIndex)),
        onToggleTodo:(data) =>
            dispatch(toggleTodo(data)),
        onDeleteTodo:(uuid) =>
            dispatch(deleteTodo(uuid)),
        onConfirmDeleteTodo:(objectId) =>
            dispatch(confirmDeleteTodo(objectId)),
        onToggleDeleteView:() =>
            dispatch(toggleDialogView())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);
