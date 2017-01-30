import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,
        fetchTodos,} from '../actions';

const initialState = {
    load:false,
    data:[]
};

const todo = (state = {}, action) => {
    switch (action.type) {
    case GET_TODOS:
        return initialState;
    case ADD_TODO:
        return {
            text: action.text,
            completed: false
        };
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
        return todo(state,action);
    case ADD_TODO:
        return [
            ...state,
            todo(undefined, action)
        ];
    case TOGGLE_TODO:
        return state.map(t =>
                    todo(t, action));
    default:
        return state;
    }
};

export default todos;
