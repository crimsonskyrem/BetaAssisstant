import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,ADD_TODO_SUCC,ADD_TODO_FAIL,FETCH_FAILED,
        ADD_CONTENT_CHANGE,ADD_CHECK_COMPLETED
        } from '../actions';

const initialState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addContent:'',
    addCompleted:false
};

const todo = (state = initialState, action) => {
    switch (action.type) {
    case GET_TODOS:
        return state;
    case RECEIVED_TODOS:
        return Object.assign({}, state, {
            data:action.data.reverse(),
            loading:false,
            show:true
        });
    case ADD_TODO:
        return Object.assign({}, state, {
            data:[{
                    uuid: action.uuid,
                    usrId: action.usrId,
                    content: state.addContent,
                    completed: state.addCompleted,
                    processing: action.processing
                  },
                   ...state.data
                 ],
            addCompleted:false,
            addContent:''
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

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_CONTENT_CHANGE:
        return Object.assign({},state,{
            addContent:action.addContent
        });
    case ADD_CHECK_COMPLETED:
        return Object.assign({},state,{
            addCompleted:action.addCompleted
        });
    case GET_TODOS:
    case RECEIVED_TODOS:
        return todo(undefined, action);
    case FETCH_FAILED:
        return Object.assign({},state,{
            loading:false,
            fail:true
        });
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

export default todoReducer;
