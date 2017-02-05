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
export const ADD_TODO_SUCC = 'ADD_TODO_SUCC';
export const ADD_TODO_FAIL = 'ADD_TODO_FAIL';

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

export const saveTodo = (data) => {
    return dispatch => {
        dispatch(addTodo(data));
        const agent = basic();
        return agent.post('todoList?fetchWhenSave=true',data).then(
            response => dispatch(addTodoSucc(response.data))
        ).catch(
            err => {
                console.log(err);
                dispatch(addTodoFail(data));
            }
        );

    };
};

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        content:data.content,
        completed:data.completed,
        uuid:data.uuid,
        usrId:data.usrId,
        processing:true
    };
};

export const addTodoSucc = (data) => {
    return {
        type: ADD_TODO_SUCC,
        uuid:data.uuid,
        updatedAt:data.createdAt,
        processing:false
    };
};

export const addTodoFail = (data) => {
    return {
        type: ADD_TODO_FAIL,
        uuid:data.uuid,
        updatedAt:'更新失败',
        processing:true
    };
};

export const fetchTodos = (usrId) => {
    return dispatch => {
        dispatch(getTodos(usrId));
        const todo = getFromUsrId(usrId);
        return todo.get('todoList')
            .then(
                response => dispatch(receivedTodos(response.data.results))
            ).catch(
                err => dispatch(receivedTodos([]))
            );
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

export const toggleTodo = (uuid) => {
    return {
        type: TOGGLE_TODO,
        uuid
    };
};

export const addMemo = (title,text) => {
    return {
        type: ADD_MEMO,
        titile,
        text
    };
};

export const getMemos = (usrId) => {
    return {
        type: GET_MEMOS,
        usrId
    };
};
