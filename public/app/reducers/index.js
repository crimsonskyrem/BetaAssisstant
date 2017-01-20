import { combineReducers } from 'redux';
import todos from './todos';
import memos from './memos';
import switchTodoMemo from './switchTodoMemo';

const usrView = combineReducers({
    todos,
    memos,
    switchTodoMemo
});

export default usrView;
