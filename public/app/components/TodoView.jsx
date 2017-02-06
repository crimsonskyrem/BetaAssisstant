import React, {Component} from 'react';
import TodoItemView from './TodoItemView';
import Stagger from 'react-css-stagger';
import '../css/card.scss';




class TodoView extends Component{
    render(){
        const {data,onToggleTodo} = this.props;
        const Lists = data.map((value)=>
            <TodoItemView value={value} onToggleTodo={onToggleTodo} />
        );
        return (
            <Stagger transition="card" delay={100}>
                {Lists}
            </Stagger>
        );
    }
}
export default TodoView;
