import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {ADD_TODO,
        fetchTodos,saveTodo} from '../actions';
import TodoView from '../components/TodoView';
import AddTodoView from '../components/AddTodoView';
import EmptyView from '../components/EmptyView';

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
        const {load,data,expanded,onAddClick,onSaveClick,usrId} = this.props;
        const empty = (data.length === 0);
        return (
                <div style={styles.list}>
                    <AddTodoView usrId={usrId}
                                 expanded={expanded}
                                 onAddClick={onAddClick}
                                 onSaveClick={onSaveClick}/>
                    {load?
                     (empty?<EmptyView />:<TodoView data={data}/>):
                        <CircularProgress size={120} thickness={5} style={styles.wait} />
                    }
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        load:state.todos.load,
        data:state.todos.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch,
        onSaveClick:(data) => {
            dispatch(saveTodo(data));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);
