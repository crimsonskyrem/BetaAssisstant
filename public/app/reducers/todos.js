import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,ADD_TODO_SUCC,ADD_TODO_FAIL
        } from '../actions';

const initialState = {
    load:false,
    data:[]
};

const todo = (state = initialState, action) => {
    switch (action.type) {
    case GET_TODOS:
        return state;
    case RECEIVED_TODOS:
        return Object.assign({}, state, {
            data:action.data.reverse(),
            load:true
        });
    case ADD_TODO:
        return Object.assign({}, state, {
            data:[{uuid: action.uuid,
                   usrId: action.usrId,
                   content: action.content,
                   completed: action.completed},
                   ...state.data
                ]
        });
    case TOGGLE_TODO:
        if (state.uuid !== action.uuid) {
            return state;
        }

        return Object.assign({}, state, {
            completed: !state.completed
        });
    case ADD_TODO_SUCC:
    case ADD_TODO_FAIL:
        if (state.uuid !== action.uuid) {
            return state;
        }
        return Object.assign({},state,{
            updatedAt:action.updatedAt,
            processing:action.processing
        });
    default:
        return state;
    }
};

const todos = (state = initialState, action) => {
    switch (action.type) {
    case GET_TODOS:
    case RECEIVED_TODOS:
        return todo(undefined, action);
    case ADD_TODO:
        return todo(state, action);
    case ADD_TODO_SUCC:
    case ADD_TODO_FAIL:
    case TOGGLE_TODO:
        return Object.assign({},state,{
            data:state.data.map(item =>
                                todo(item, action))
        });
    default:
        return state;
    }
};

export default todos;
