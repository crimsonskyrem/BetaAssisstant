import { GET_MEMOS,RECEIVED_MEMOS,ADD_MEMO_MENU_SAVE,ADD_MEMO_MENU_SELECT_TAG,ADD_MEMO_MENU_INPUT_TAG } from '../actions';

const initialState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addTitle:'',
    addContent:'',
    addTags:[],
    addMenuValue:'',
    deleteOpen:false,
    deleteObjectId:''
};

const initialItem = {
    title:'',
    content:'',
    updatedAt:'',
    uuid:'',
    objectId:'',
    tags:''
};

const handleState = (state = initialState, action) => {
    switch (action.type) {
    case RECEIVED_MEMOS:
        return Object.assign({}, state, {
            data:action.data.reverse(),
            loading:false,
            show:true
        });
    case ADD_MEMO_MENU_INPUT_TAG:
    case ADD_MEMO_MENU_SELECT_TAG:
        return Object.assign({}, state, {
            addMenuValue:action.type
        });
    case GET_MEMOS:
    default:
        return state;
    }
};

const handleItem = (item = initialItem,action) => {
    switch(action.type){
    case RECEIVED_MEMOS:
        return Object.assign({},item,{
            processing:false
        });
    default:
        return item;
    }
};

const memoReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_MEMOS:
    case RECEIVED_MEMOS:
        return handleState(undefined,action);
    case ADD_MEMO_MENU_INPUT_TAG:
    case ADD_MEMO_MENU_SELECT_TAG:
        return handleState(state,action);
    default:
        return state;
    }
};

export default memoReducer;
