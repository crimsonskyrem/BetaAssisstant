import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {fetchTodos} from '../actions';
import TodoView from '../components/TodoView';
import AddTodoView from '../components/AddTodoView';

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
        const {load,data,expanded,onAddClick} = this.props;
        return (
                <div style={styles.list}>
                    <AddTodoView style={styles.addBlock}
                        expanded={expanded} onAddClick={onAddClick} />
                {load?
                    <TodoView data={data}/> :
                    <CircularProgress size={120} thickness={5} style={styles.wait} />}
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

export default connect(mapStateToProps)(TodoApp);
