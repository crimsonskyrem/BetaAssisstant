import {basic,getFromUsrId} from './restApi';

export const TODO = 'TODO';
export const MEMO = 'MEMO';
export const GET_TODOS = 'GET_TODOS';
export const GET_MEMOS = 'GET_MEMOS';
export const RECEIVED_TODOS = 'RECEIVED_TODOS';
export const ADD_BUTTON_CLICK = 'ADD_BUTTON_CLICK';
export const ADD_TODO = 'ADD_TODO';
export const ADD_MEMO = 'ADD_MEMO';
export const SWITCH_TODO_MEMO = 'SWITCH_TODO_MEMO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        content:data.content,
        completed:data.completed
    };
};
export const addMemo = (title,text) => {
    return {
        type: ADD_MEMO,
        titile,
        text
    };
};

export const switchTodoMemo = (view) => {
    return {
        type: SWITCH_TODO_MEMO,
        view
    };
};

export const addButtonClick = (addExpanded) => {
    return {
        type:ADD_BUTTON_CLICK,
        addExpanded
    };
};

export const getTodos = (usrId) => {
    return {
        type: GET_TODOS,
        usrId
    };
};

export const receivedTodos = (data) => {
    return {
        type: RECEIVED_TODOS,
        data: data,
        receivedAt: Date.now()
    };
};

export const getMemos = (usrId) => {
    return {
        type: GET_MEMOS,
        usrId
    };
};

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    };
};

export const fetchTodos = (usrId) => {
    return dispatch => {
        dispatch(getTodos(usrId));
        const todo = getFromUsrId(usrId);
        return todo.get('memoList')
            .then(
                response => dispatch(receivedTodos(response.data.results))
                //response => dispatch(receivedTodos([]))
            );
    };
};

export const saveTodo = (data) => {
    return dispatch => {
        dispatch(addTodo(data));
        const agent = basic();
        return agent.post('todoList',{data:data}).then(
            response => {
                console.log(response.data);
            }
        );

    };
};
