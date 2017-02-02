import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {fetchTodos} from '../actions';
import TodoView from '../components/TodoView';
import axios from 'axios';

const styles = {
    list:{
        textAlign: 'center',
        minHeight: '200px'
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
        const {load,data} = this.props;
        return (
                <div style={styles.list}>
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
