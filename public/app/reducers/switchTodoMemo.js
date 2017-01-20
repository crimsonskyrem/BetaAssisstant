import {TODO,MEMO,SWITCH_TODO_MEMO} from '../actions';

const initialState ={
    view:TODO
};

const switchTodoMemo = (state = initialState, action) => {
    switch (action.type) {
    case SWITCH_TODO_MEMO:
        return Object.assign({},state,{
            view:action.view
        });
    default:
        return state;
    }
};

export default switchTodoMemo;
