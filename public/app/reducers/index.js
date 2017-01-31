import { combineReducers } from 'redux';
import todos from './todos';
import memos from './memos';
import switchTodoMemo from './switchTodoMemo';

const usrReducer = combineReducers({
    switchTodoMemo,
    todos,
    memos
});

export default usrReducer;
