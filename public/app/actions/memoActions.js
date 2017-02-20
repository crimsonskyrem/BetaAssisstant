import {basic,getFromUsrId} from './restApi';
import { FETCH_FAILED,fetchFailed } from './index';

export const MEMO = 'MEMO';
export const GET_MEMOS = 'GET_MEMOS';
export const RECEIVED_MEMOS = 'RECEIVED_MEMOS';
export const ADD_MEMO = 'ADD_MEMO';
export const ADD_MEMO_MENU_SAVE = 'ADD_MEMO_MENU_SAVE';
export const ADD_MEMO_MENU_SELECT_TAG = 'ADD_MEMO_MENU_SELECT_TAG';
export const ADD_MEMO_MENU_INPUT_TAG = 'ADD_MEMO_MENU_INPUT_TAG';
export const ADD_MEMO_MENU_TAG_ADD = 'ADD_MEMO_MENU_TAG_ADD';
export const ADD_MEMO_MENU_TAG_DEL = 'ADD_MEMO_MENU_TAG_DEL';
export const ADD_MEMO_MENU_CLEAR = 'ADD_MEMO_MENU_CLEAR';
export const ADD_MEMO_TITLE_CHANGE = 'ADD_MEMO_TITLE_CHANGE';
export const ADD_MEMO_CONTENT_CHANGE = 'ADD_MEMO_CONTENT_CHANGE';
export const ADD_MEMO_UPDATE_EDIT_UUID = 'ADD_MEMO_UPDATE_EDIT_UUID';

export const fetchMemos = (usrId) => {
    return dispatch => {
        dispatch(getMemos(usrId));
        const memo = getFromUsrId(usrId);
        return memo.get('memoList')
            .then(
                response => {
                    dispatch(receivedMemos(response.data.results));
                }
            ).catch(
                err => dispatch(fetchFailed())
            );
    };
};

export const getMemos = (usrId) => {
    return {
        type: GET_MEMOS,
        usrId
    };
};

export const receivedMemos = (data) => {
    let tmp = data.map(v => v.tags).join(',').split(',') || [];
    tmp = tmp.filter(v => v.length > 0);
    return {
        type: RECEIVED_MEMOS,
        data: data,
        storeTags:tmp,
        receivedAt: Date.now()
    };
};

export const addMemoMenuOnTouch = (val) => {
    if(val == ADD_MEMO_MENU_SAVE){
        return {
            type:ADD_MEMO_MENU_SAVE
        };
    }
    return {
        type:val
    };
};

export const addMemoTitleChange = (title) => {
    return {
        type:ADD_MEMO_TITLE_CHANGE,
        title
    };
};

export const addMemoContentChange = (content) => {
    return {
        type:ADD_MEMO_CONTENT_CHANGE,
        content
    };
};

export const updateEditUuid = (uuid) => {
    return {
        type: ADD_MEMO_UPDATE_EDIT_UUID,
        uuid
    };
};

export const addMemoTagsAdd = (tag) => {
    return {
        type: ADD_MEMO_MENU_TAG_ADD,
        tag
    };
};

export const addMemoTagsDel = (tag) => {
    return {
        type: ADD_MEMO_MENU_TAG_DEL,
        tag
    };
};

export const addMemo = (data) => {
    return {
        type: ADD_MEMO,
        title:data.title,
        content:data.content,
        uuid:data.uuid,
        tags:data.tags,
        usrId:data.usrId,
        processing:true
    };
};

