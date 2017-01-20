const TODO = 'TODO';
const MEMO = 'MEMO';
const ADD_TODO = 'ADD_TODO';
const ADD_MEMO = 'ADD_MEMO';
const SWITCH_TODO_MEMO = 'SWITCH_TODO_MEMO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    };
};
const addMemo = (title,text) => {
    return {
        type: ADD_MEMO,
        titile,
        text
    };
};

const switchTodoMemo = (view) => {
    return {
        type: SWITCH_TODO_MEMO,
        view
    };
};

const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    };
};

export {TODO,MEMO,ADD_TODO,ADD_MEMO,SWITCH_TODO_MEMO,TOGGLE_TODO,
        addTodo,addMemo,switchTodoMemo,toggleTodo};
