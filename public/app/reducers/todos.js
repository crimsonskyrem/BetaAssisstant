import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,
        fetchTodos,} from '../actions';

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
            data:action.data,
            load:true
        });
    case ADD_TODO:
        return Object.assign({}, state, {
            data:[
                    ...state.data,
                    {text: action.text,
                    completed: false}
                ]
        });
    case TOGGLE_TODO:
        if (state.id !== action.id) {
            return state;
        }

        return Object.assign({}, state, {
            completed: !state.completed
        });

    default:
        return state;
    }
};

const todos = (state = initialState, action) => {
    switch (action.type) {
    case GET_TODOS:
    case RECEIVED_TODOS:
    case ADD_TODO:
        return todo(undefined, action);
    case TOGGLE_TODO:
        return state.map(t =>
                    todo(t, action));
    default:
        return state;
    }
};

export default todos;
