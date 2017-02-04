import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {ADD_TODO,
        fetchTodos,addTodo} from '../actions';
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
        const {dispatch,id} = this.props;
        dispatch(fetchTodos(id));
    }
    render(){
        const {load,data,expanded,onAddClick,onSaveClick} = this.props;
        const empty = (data.length === 0);
        return (
                <div style={styles.list}>
                    <AddTodoView expanded={expanded}
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
        onSaveClick:(text,completed) => {
            dispatch(addTodo(text,completed));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);