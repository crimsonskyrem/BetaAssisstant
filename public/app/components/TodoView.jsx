import React, {Component} from 'react';
import TodoItemView from './TodoItemView';
import {StaggeredMotion,spring,presets} from 'react-motion';


class TodoView extends Component{
    render(){
        const {data,onToggleTodo,onDeleteTodo} = this.props;
        const Lists = data.map((value)=>
            <TodoItemView value={value} onToggleTodo={onToggleTodo} />
        );
        return (
        <StaggeredMotion
        defaultStyles={data.map((_,i)=>({left:-1000}))}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
            ? {left: spring(0)}
            : {left: spring(prevInterpolatedStyles[i - 1].left)}
        })}>
        {interpolatingStyles =>
            <div>
            {interpolatingStyles.map((style, i) =>
                <div key={i} style={{position:'relative',left: style.left}}>
                    <TodoItemView value={data[i]} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
                </div>)
            }
            </div>
        }
        </StaggeredMotion>
       );
    }
}
export default TodoView;
