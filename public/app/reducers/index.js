import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import memoReducer from './memoReducer';
import switchTodoMemo from './switchTodoMemo';

const usrReducer = combineReducers({
    switchTodoMemo,
    todoReducer,
    memoReducer
});

export default usrReducer;
