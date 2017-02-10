import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,ADD_TODO_SUCC,ADD_TODO_FAIL,FETCH_FAILED,
        ADD_CONTENT_CHANGE,ADD_CHECK_COMPLETED,DELETE_TODO,TOGGLE_TODO_VIEW,SWIPE_TODO_TAB
        } from '../actions';

const initialState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addContent:'',
    addCompleted:false,
    deleteOpen:false,
    deleteUuid:''
};

const todo = (state = initialState, action) => {
    switch (action.type) {
    case GET_TODOS:
        return state;
    case RECEIVED_TODOS:
        return Object.assign({}, state, {
            data:action.data.map(item => handleDataItem(item,action)).reverse(),
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
                    processing: action.processing,
                    tabIndex:0
                  },
                   ...state.data
                 ],
            addCompleted:false,
            addContent:''
        });
   default:
        return state;
    }
};

const handleDataItem = (item = {},action) => {
    switch(action.type){
    case RECEIVED_TODOS:
        return Object.assign({},item,{
            processing:false,
            tabIndex:0
        });
    case TOGGLE_TODO:
        if (item.uuid !== action.uuid) {
            return item;
        }
        return Object.assign({}, item, {
            completed: !item.completed
        });
    case SWIPE_TODO_TAB:
        if (item.uuid !== action.uuid) {
            return item;
        }
        return Object.assign({}, item, {
            tabIndex: !item.tabIndex
        });
    case ADD_TODO_SUCC:
    case ADD_TODO_FAIL:
        if (item.uuid !== action.uuid) {
            return item;
        }
        return Object.assign({},item,{
            updatedAt:action.updatedAt,
            processing:action.processing
        });
    default:
        return item;
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
    case TOGGLE_TODO_VIEW:
        return Object.assign({},state,{
            show:!state.show
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
    case SWIPE_TODO_TAB:
        return Object.assign({},state,{
            data:state.data.map(item =>
                                handleDataItem(item, action))
        });
    case DELETE_TODO:
        return Object.assign({},state,{
            data:state.data.filter(item => item.uuid !== action.uuid)
        });
    default:
        return state;
    }
};

export default todoReducer;
