import {connect} from 'react-redux';
import {MEMO,TODO,SWITCH_TODO_MEMO,switchTodoMemo} from '../actions';
import CombineView from '../components/CombineView';

const mapStateToProps = (state) => {
    return {
        view:state.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTouchTap: (view) => {
            dispatch(switchTodoMemo(view));
        }
    };
};

const switchableCombineView = connect(
    mapStateToProps,
    mapDispatchToProps
)(CombineView);

export default switchableCombineView;
