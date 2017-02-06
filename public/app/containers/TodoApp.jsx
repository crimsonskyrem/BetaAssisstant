import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {ADD_TODO,
        addContentChange,addCheckCompleted,
        fetchTodos,saveTodo,toggleTodo} from '../actions';
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
        const {usrId,expanded,addContent,addCompleted} = this.props;
        const {onAddContentChange,onAddCheckCompleted,onAddClick,onSaveClick} = this.porps;
        const {loading,show,fail,data,onToggleTodo,} = this.props;
        const empty = ((data.length === 0) && show);
        return (
                <div style={styles.list}>
                    <AddTodoView usrId={usrId}
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
                    {show?<TodoView data={data} onToggleTodo={onToggleTodo}/>:''}
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
        addCompleted:state.todoReducer.addCompleted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch,
        onAddContentChange:(e,content) =>
            dispatch(addContentChange(content)),
        onAddCheckCompleted:(e,completed) =>
            dispatch(addCheckCompleted(completed)),
        onSaveClick:(data) =>
            dispatch(saveTodo(data)),
        onToggleTodo:(uuid) =>
            dispatch(toggleTodo(uuid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);
