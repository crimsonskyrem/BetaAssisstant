import {basic,getFromUsrId} from './restApi';
import { FETCH_FAILED,fetchFailed,toggleDialogView } from './index';

export const MEMO = 'MEMO';
export const GET_MEMOS = 'GET_MEMOS';
export const RECEIVED_MEMOS = 'RECEIVED_MEMOS';
export const ADD_MEMO_SUCC = 'ADD_MEMO_SUCC';
export const ADD_MEMO_FAIL = 'ADD_MEMO_FAIL';
export const EDIT_MEMO = 'EDIT_MEMO';
export const DELETE_MEMO = 'DELETE_MEMO';
export const CONFIRM_DELETE_MEMO = 'CONFIRM_DELETE_MEMO';
export const ADD_MEMO_MENU_SAVE = 'ADD_MEMO_MENU_SAVE';
export const ADD_MEMO_MENU_SELECT_TAG = 'ADD_MEMO_MENU_SELECT_TAG';
export const ADD_MEMO_MENU_INPUT_TAG = 'ADD_MEMO_MENU_INPUT_TAG';
export const ADD_MEMO_MENU_TAG_ADD = 'ADD_MEMO_MENU_TAG_ADD';
export const ADD_MEMO_MENU_TAG_DEL = 'ADD_MEMO_MENU_TAG_DEL';
export const ADD_MEMO_MENU_CLEAR = 'ADD_MEMO_MENU_CLEAR';
export const ADD_MEMO_TITLE_CHANGE = 'ADD_MEMO_TITLE_CHANGE';
export const ADD_MEMO_CONTENT_CHANGE = 'ADD_MEMO_CONTENT_CHANGE';
export const ADD_MEMO_UPDATE_EDIT_UUID = 'ADD_MEMO_UPDATE_EDIT_UUID';
export const ADD_MEMO_CONFIRM_DELETE_CACHE = 'ADD_MEMO_CONFIRM_DELETE_CACHE';

export const fetchMemos = (usrId) => {
    return dispatch => {
        dispatch(getMemos(usrId));
        const memo = getFromUsrId(usrId);
        return memo.get('memoList')
            .then(
                response => {
                    dispatch(receivedMemos(response.data.results,usrId));
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

export const receivedMemos = (data,usrId) => {
    let tmp = data.map(v => v.tags).join(',').split(',') || [];
    tmp = tmp.filter(v => v.length > 0);
    return {
        type: RECEIVED_MEMOS,
        data: data,
        storeTags:tmp,
        receivedAt: Date.now(),
        usrId:usrId
    };
};

export const addMemoMenuOnTouch = (val) => {
    if(val == ADD_MEMO_MENU_SAVE){
        return dispatch => {
            dispatch(addMemoMenuSave());
            const savedState = JSON.parse(localStorage.getItem('memoAddState')) ;
            const agent = basic();
            const data = {
                usrId:savedState.forSaveUsrId,
                title:savedState.addTitle,
                content:savedState.addContent,
                uuid:savedState.editUuid,
                tags:savedState.addTags.join(',')
            };
            console.log(savedState);
            return agent.post('memoList?fetchWhenSave=true',data).then(
                response => {
                    dispatch(addMemoSucc(response.data));
                    localStorage.removeItem('memoAddState');
                }
            ).catch(
                err => {
                    console.log(err);
                    dispatch(addMemoFail(data));
                }
            );
        };
    }
    return {
        type:val
    };
};

export const addMemoMenuSave = () => {
    return {
        type:ADD_MEMO_MENU_SAVE
    };
};

export const addMemoSucc = (data) => {
    return {
        type: ADD_MEMO_SUCC,
        uuid:data.uuid,
        objectId: data.objectId
    };
};

export const addMemoFail = (data) => {
    return {
        type: ADD_MEMO_FAIL,
        uuid:data.uuid,
        addTitle:data.title,
        addContent:data.content,
        addTags:data.tags
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


export const editMemo = (uuid) => {
    return {
        type: EDIT_MEMO,
        uuid
    };
};

export const addMemoConfirmDeleteCache = (uuid) => {
    return {
        type: ADD_MEMO_CONFIRM_DELETE_CACHE,
        uuid
    };
};

export const deleteMemo = (objectId) => {
    return {
        type: DELETE_MEMO,
        objectId
    };
};

export const confirmDeleteMemo = (objectId) => {
    return dispatch => {
        const agent = basic();
        return agent.delete(`memoList/${objectId}`).then(
            response => {
                dispatch(deleteMemoSucc(objectId));
            }
        ).catch(
            err => {
                console.log(err);
                dispatch(toggleDialogView());
            }
        );
    };
};

export const deleteMemoSucc = (objectId) => {
    return {
        type: CONFIRM_DELETE_MEMO,
        objectId
    };
}
