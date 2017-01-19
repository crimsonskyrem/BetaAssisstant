import { combineReducers } from 'redux';
import todos from './todos';
import memos from './memos';
import toggoleTodoMemo from './toggleTodoMemo';

const usrApp = combineReducers({
    todos,
    memos,
    toggleTodoMemo
});

export default usrApp;
