import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddTodoView from '../components/AddTodoView';

class AddTodoApp extends Component{
    constructor(){
        super();
        this.state = {
            todoText:'',
            finished:false
        }
    }
    checkBox(event,checked){
        this.setState({
            finished:checked
        });
    }
    textChange(event,newVal){
        this.setState({
            todoText:newVal
        });
    }
}

const mapStateToProps = (state) => {
    return {
        todoText:
    }
}
