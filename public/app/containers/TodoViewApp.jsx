import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MuiThemeProvider,CircularProgress} from 'material-ui';
import {fetchTodos} from '../actions';
import Todos from '../components/Todos';
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

class TodoView extends Component{
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
            <MuiThemeProvider>
                <div style={styles.list}>
                {load?
                    <Todos data={data}/> :
                    <CircularProgress size={120} thickness={5} style={styles.wait} />}
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        load:state.todos.load,
        data:state.todos.data
    };
};

const TodoViewApp = connect(mapStateToProps)(TodoView);

export default TodoViewApp;
