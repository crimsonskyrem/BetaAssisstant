import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import memos from './memos';
import switchTodoMemo from './switchTodoMemo';

const usrReducer = combineReducers({
    switchTodoMemo,
    todoReducer,
    memos
});

export default usrReducer;
