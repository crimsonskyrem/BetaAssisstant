import {basic,getFromUsrId} from './restApi';
import { FETCH_FAILED,fetchFailed } from './index';

export const MEMO = 'MEMO';
export const GET_MEMOS = 'GET_MEMOS';
export const RECEIVED_MEMOS = 'RECEIVED_MEMOS';
export const ADD_MEMO = 'ADD_MEMO';

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
    return {
        type: RECEIVED_MEMOS,
        data: data,
        receivedAt: Date.now()
    };
};

export const addMemo = (title,text) => {
    return {
        type: ADD_MEMO,
        titile,
        text
    };
};

