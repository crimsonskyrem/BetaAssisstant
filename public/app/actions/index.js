export * from './todoActions';

export const MEMO = 'MEMO';
export const GET_MEMOS = 'GET_MEMOS';
export const ADD_MEMO = 'ADD_MEMO';
export const SWITCH_TODO_MEMO = 'SWITCH_TODO_MEMO';

export const switchTodoMemo = (view) => {
    return {
        type: SWITCH_TODO_MEMO,
        view
    };
};

export const addMemo = (title,text) => {
    return {
        type: ADD_MEMO,
        titile,
        text
    };
};

export const getMemos = (usrId) => {
    return {
        type: GET_MEMOS,
        usrId
    };
};
