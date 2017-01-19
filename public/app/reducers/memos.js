const memo = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_MEMO':
        return {
            title: action.title,
            text: action.text,
            completed: false
        };
    case 'TOGGLE_MEMO':
        if (state.id !== action.id) {
            return state;
        }

        return Object.assign({}, state, {
            completed: !state.completed
        });

    default:
        return state;
    }
};

const memos = (state = [], action) => {
    switch (action.type) {
    case 'ADD_MEMO':
        return [
            ...state,
            memo(undefined, action)
        ];
    case 'TOGGLE_MEMO':
        return state.map(t =>
                    memo(t, action));
    default:
        return state;
    }
};

export default memos;
