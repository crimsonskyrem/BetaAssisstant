import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MuiThemeProvider,CircularProgress} from 'material-ui';
import {ADD_TODO,TOGGLE_TODO} from '../actions';
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
        this.state = {
            load:false,
            data:[]
        };
    }
    componentDidMount(){
        const component = this;
        axios.post('/json', {
            usr: component.props.id
        }).then(function (response) {
            component.setState({
                load:true,
                data:response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }
    render(){
        return (
            <MuiThemeProvider>
                <div style={styles.list}>
                {this.state.load?
                <Todos data={this.state.data}/>
                    :
                <CircularProgress size={120} thickness={5} style={styles.wait} />
                }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default TodoView;
