import { GET_MEMOS,RECEIVED_MEMOS } from '../actions';

const initialState = {
    loading:true,
    show:false,
    fail:false,
    data:[],
    addTitle:'',
    addContent:'',
    addTags:'',
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
    default:
        return state;
    }
};

export default memoReducer;
