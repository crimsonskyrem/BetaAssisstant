import axios from 'axios';

const TODO = 'TODO';
const MEMO = 'MEMO';
const GET_TODOS = 'GET_TODOS';
const GET_MEMOS = 'GET_MEMOS';
const RECEIVED_TODOS = 'RECEIVED_TODOS';
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

const getTodos = (usrId) => {
    return {
        type: GET_TODOS,
        usrId
    };
};

const receivedTodos = (usrId,data) => {
    return {
        type: RECEIVED_TODOS,
        data: data,
        receivedAt: Date.now()
    };
};

const fetchTodos = (usrId) => {
    return dispatch => {
        dispatch(getTodos(usrId));
        return axios.post('/json', {
            usr: usrId
        }).then(
            response => dispatch(receivedTodos(usrId,response.data))
        ).catch(function (error) {
            console.log(error);
        });
    };
};

const getMemos = (usrId) => {
    return {
        type: GET_MEMOS,
        usrId
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
