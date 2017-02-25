import { GET_MEMOS,RECEIVED_MEMOS,ADD_MEMO_MENU_SAVE,ADD_MEMO_MENU_SELECT_TAG,ADD_MEMO_MENU_INPUT_TAG,
         ADD_MEMO_TITLE_CHANGE,ADD_MEMO_CONTENT_CHANGE,ADD_MEMO_MENU_CLEAR,ADD_MEMO_UPDATE_EDIT_UUID,
         ADD_MEMO_MENU_TAG_ADD,ADD_MEMO_MENU_TAG_DEL,EDIT_MEMO,TOGGLE_DIALOG_VIEW,ADD_MEMO_CONFIRM_DELETE_CACHE,
         DELETE_MEMO,CONFIRM_DELETE_MEMO,ADD_MEMO_FAIL,
       } from '../actions';

const defaultState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addTitle:'',
    addContent:'',
    addTags:[],
    storeTags:[],
    addMenuValue:'',
    editUuid:'',
    cacheUuid:'',
    deleteOpen:false,
    deleteCache:false,
    deleteObjectId:''
};

const savedState = JSON.parse(localStorage.getItem('memoAddState')) || defaultState;

const initialState =  Object.assign({},defaultState,{
    editUuid:savedState.editUuid,
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
    tags:[]
};

const handleState = (state = initialState, action) => {
    switch (action.type) {
    case RECEIVED_MEMOS:
        return Object.assign({}, state, {
            data:action.data.reverse(),
            storeTags:action.storeTags,
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
    case ADD_MEMO_MENU_CLEAR:
        localStorage.removeItem('memoAddState');
        return Object.assign({},state,{
            addTitle:'',
            addMenuValue:'',
            addContent:'',
            addTags:[],
            editUuid:''
        });
    case ADD_MEMO_CONTENT_CHANGE:
        const newContent = Object.assign({}, state, {
            addContent:action.content
        });
        localStorage.setItem('memoAddState', JSON.stringify(newContent));
        return newContent;
    case ADD_MEMO_MENU_TAG_ADD:
        const newAddTags = Object.assign({}, state, {
            addTags:[
                action.tag,
                ...state.addTags.filter(v => v != action.tag)
            ],
            storeTags:[
                action.tag,
                ...state.storeTags.filter(v => v != action.tag)
            ],
            addMenuValue:''
        });
        localStorage.setItem('memoAddState', JSON.stringify(newAddTags));
        return newAddTags;
    case ADD_MEMO_MENU_TAG_DEL:
        const newDelTags = Object.assign({}, state, {
            addTags:state.addTags.filter(v => v != action.tag),
            addMenuValue:''
        });
        localStorage.setItem('memoAddState', JSON.stringify(newDelTags));
        return newDelTags;
    case ADD_MEMO_UPDATE_EDIT_UUID:
        return Object.assign({},state,{
            editUuid:action.uuid
        });
    case TOGGLE_DIALOG_VIEW:
        return Object.assign({},state,{
            deleteOpen:false,
            deleteCache:false
        });
    case DELETE_MEMO:
        return Object.assign({},state,{
            deleteOpen:true,
            deleteObjectId:action.objectId
        });
    case CONFIRM_DELETE_MEMO:
        console.log(action.objectId);
        return Object.assign({},state,{
            data:state.data.filter(v => v.objectId != action.objectId),
            deleteOpen:false
        });
    case ADD_MEMO_FAIL:
        const updateState = Object.assign({},state,{
            editUuid:action.uuid,
            addTitle:action.addTitle,
            addContent:action.addContent,
            addTags:action.addTags
        });
        localStorage.setItem('memoAddState', JSON.stringify(updateState));
        return Object.assign({},updateState,{
            data:state.data.map(v => {
                if(v.uuid == action.uuid){
                    return Object.assign({},v,{
                        tags:['添加失败'],
                        processing:false
                    });
                }else{
                    return v;
                }
            })
        });
    case GET_MEMOS:
    default:
        return state;
    }
};

const handleItemChange = (state) => {
    let tmpItem = state.data.filter(v => v.uuid == state.editUuid)[0] || initialItem;
    let tmpData = state.data.filter(v => v.uuid != state.editUuid);
    if(state.addTitle === '' && state.addContent === '')return state;
    tmpItem = Object.assign({},tmpItem,{
        uuid:state.editUuid,
        title:state.addTitle,
        content:state.addContent,
        tags:state.addTags,
        processing:true
    });
    return Object.assign({},state,{
        addTitle:'',
        addContent:'',
        addTags:[],
        cacheUuid:'',
        editUuid:'',
        data:[
            tmpItem,
            ...tmpData
        ]
    });
};

const handleEditItem = (state,action) => {
    let item = state.data.filter(v => v.uuid == action.uuid)[0];
    let newState = Object.assign({},state,{
        cacheUuid:'',
        editUuid:item.uuid,
        addTitle:item.title ||'',
        addContent:item.content ||'',
        addTags:item.tags||[],
        deleteOpen:false
    });
    if(action.type == ADD_MEMO_CONFIRM_DELETE_CACHE ){
        localStorage.removeItem('memoAddState');
        return newState;
    }
    if(state.addTitle == '' && state.addContent == ''){
        return newState;
    }else{
        return Object.assign({},state,{
            cacheUuid:action.uuid,
            deleteCache:true,
            deleteOpen:true
        });
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
    case ADD_MEMO_MENU_CLEAR:
    case ADD_MEMO_UPDATE_EDIT_UUID:
    case ADD_MEMO_MENU_TAG_ADD:
    case ADD_MEMO_MENU_TAG_DEL:
    case TOGGLE_DIALOG_VIEW:
    case DELETE_MEMO:
    case CONFIRM_DELETE_MEMO:
    case ADD_MEMO_FAIL:
        return handleState(state,action);
    case EDIT_MEMO:
    case ADD_MEMO_CONFIRM_DELETE_CACHE:
        return handleEditItem(state,action);
    case ADD_MEMO_MENU_SAVE:
        return handleItemChange(state);
    default:
        return state;
    }
};

export default memoReducer;
