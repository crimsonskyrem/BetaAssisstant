import axios from 'axios';

const TODO = 'TODO';
const MEMO = 'MEMO';
const GET_TODOS = 'GET_TODOS';
const GET_MEMOS = 'GET_MEMOS';
const RECEIVED_TODOS = 'RECEIVED_TODOS';
const ADD_BUTTON_CLICK = 'ADD_BUTTON_CLICK';
const ADD_TODO = 'ADD_TODO';
const ADD_MEMO = 'ADD_MEMO';
const SWITCH_TODO_MEMO = 'SWITCH_TODO_MEMO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const api = restful('https://api.leancloud.cn/1.1/classes', fetchBackend(fetch));
        api.header('X-LC-Id','LyfJraLkUWELBXzlcWJnEgkR');
        api.header('X-LC-Key','XzJ6v4UjNBHT1pSUkWpRaozQ');
api.header('Content-Type','application/json');
const todos = api.all('memoList');
//                 .header('X-LC-Key','XzJ6v4UjNBHT1pSUkWpRaozQ')
//                 .header('Content-Type','application/json')
const config = {
    baseURL:'https://api.leancloud.cn/1.1/classes',
    headers:{
        'X-LC-Id':'LyfJraLkUWELBXzlcWJnEgkR',
        'X-LC-Key':'XzJ6v4UjNBHT1pSUkWpRaozQ',
        'Content-Type':'application/json'
    },
    params: {
        where: '{"userId":"osEijvyh3bbYNYSPjORKAoDngtO0"}'
    }
};
const todo = axios.create(config);



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

const addButtonClick = (addExpanded) => {
    return {
        type:ADD_BUTTON_CLICK,
        addExpanded
    };
};

const getTodos = (usrId) => {
    return {
        type: GET_TODOS,
        usrId
    };
};

const receivedTodos = (usrId,data) => {
    console.log(data);
    return {
        type: RECEIVED_TODOS,
        data: data,
        receivedAt: Date.now()
    };
};

const fetchTodos = (usrId) => {
    return dispatch => {
        dispatch(getTodos(usrId));
        return todo.get('memoList')
                    .then(
                        response => dispatch(receivedTodos(usrId,response.data.results))
                    );
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
        GET_TODOS,GET_MEMOS,RECEIVED_TODOS,ADD_BUTTON_CLICK,
        getTodos,receivedTodos,fetchTodos,addButtonClick,
        addTodo,addMemo,switchTodoMemo,toggleTodo};
