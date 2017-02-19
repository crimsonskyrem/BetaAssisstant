import { GET_MEMOS,RECEIVED_MEMOS,ADD_MEMO_MENU_SAVE,ADD_MEMO_MENU_SELECT_TAG,ADD_MEMO_MENU_INPUT_TAG,
         ADD_MEMO_TITLE_CHANGE,ADD_MEMO_CONTENT_CHANGE
       } from '../actions';

const defaultState = {
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

const savedState = JSON.parse(localStorage.getItem('memoAddState')) || defaultState;

const initialState =  Object.assign({},defaultState,{
    addTitle:savedState.addTitle,
    addTags:savedState.addTags,
    addContent:savedState.addContent
});

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
    case ADD_MEMO_TITLE_CHANGE:
        const newTitle =Object.assign({}, state, {
            addTitle:action.title
        });
        localStorage.setItem('memoAddState', JSON.stringify(newTitle));
        return newTitle;
    case ADD_MEMO_CONTENT_CHANGE:
        const newContent = Object.assign({}, state, {
            addContent:action.content
        });
        localStorage.setItem('memoAddState', JSON.stringify(newContent));
        return newContent;
//        localStorage.removeItem(key);
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
    case ADD_MEMO_TITLE_CHANGE:
    case ADD_MEMO_CONTENT_CHANGE:
        return handleState(state,action);
    default:
        return state;
    }
};

export default memoReducer;
