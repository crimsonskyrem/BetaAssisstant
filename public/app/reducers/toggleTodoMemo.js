const toggleTodoMemo = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
    case 'Toggle_TODO_MEMO':
        return action.filter;
    default:
        return state;
    }
};

export default toggleTodoMemo;
