import {ADD_TODO,TOGGLE_TODO,GET_TODOS,RECEIVED_TODOS,ADD_TODO_SUCC,ADD_TODO_FAIL,FETCH_FAILED,
        ADD_CONTENT_CHANGE,ADD_CHECK_COMPLETED,DELETE_TODO,TOGGLE_DIALOG_VIEW,SWIPE_TODO_TAB,DELETE_TODO_FAILED
        } from '../actions';

const initialState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addContent:'',
    addCompleted:false,
    deleteOpen:false,
    deleteObjectId:''
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
            tabIndex:0 //暂时没什么卵用
        });
    case TOGGLE_TODO:
        if (item.uuid !== action.uuid) {
            return item;
        }
        return Object.assign({}, item, {
            completed: !item.completed
        });
    case SWIPE_TODO_TAB:
        //暂时没什么卵用
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
            objectId:action.objectId,
            updatedAt:action.updatedAt,
            processing:action.processing
        });
    case DELETE_TODO_FAILED:
        if (item.objectId !== action.objectId) {
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
    case TOGGLE_DIALOG_VIEW:
        let tmp = action.uuid === undefined?'':state.data.filter(item => item.uuid === action.uuid)[0].objectId;
        return Object.assign({},state,{
            deleteOpen:!state.deleteOpen,
            deleteObjectId:tmp
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
    case DELETE_TODO_FAILED:
    case TOGGLE_TODO:
    case SWIPE_TODO_TAB:
        //暂时没什么卵用
        return Object.assign({},state,{
            data:state.data.map(item =>
                                handleDataItem(item, action))
        });
    case DELETE_TODO:
        return Object.assign({},state,{
            data:state.data.filter(item => item.objectId !== state.deleteObjectId)
        });
    default:
        return state;
    }
};

export default todoReducer;
