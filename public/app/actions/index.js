export * from './todoActions';
export * from './memoActions';

export const SWITCH_TODO_MEMO = 'SWITCH_TODO_MEMO';
export const FETCH_FAILED = 'FETCH_FAILED';

export const switchTodoMemo = (view) => {
    return {
        type: SWITCH_TODO_MEMO,
        view
    };
};

export const fetchFailed= () => {
    return {
        type: FETCH_FAILED
    };
};
