import {TODO,MEMO,SWITCH_TODO_MEMO,ADD_BUTTON_CLICK} from '../actions';

const initialState ={
    view:MEMO,
    addExpanded:false
};

const switchTodoMemo = (state = initialState, action) => {
    switch (action.type) {
    case SWITCH_TODO_MEMO:
        return Object.assign({},state,{
            view:action.view == TODO? MEMO:TODO,
            addExpanded:false
        });
    case ADD_BUTTON_CLICK:
        return Object.assign({},state,{
            addExpanded:!action.addExpanded
        });
    default:
        return state;
    }
};

export default switchTodoMemo;
