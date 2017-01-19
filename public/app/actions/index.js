const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text
    };
};
const addMemo = (title,text) => {
    return {
        type: 'ADD_MEMO',
        titile,
        text
    };
};

const toggleTodoMemo = (filter) => {
    return {
        type: 'TOGGLE_TODO_MEMO',
        filter
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

export {addTodo,addMemo,toggleTodoMemo,toggleTodo};
