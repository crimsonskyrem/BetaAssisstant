import {connect} from 'react-redux';
import CombineView from '../components/CombineView';
import {switchTodoMemo,TODO} from '../actions';

const mapStateToProps = (state) => {
    return {
        view:state.switchTodoMemo.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchClick: (view) => {
            dispatch(switchTodoMemo(view));
        }
    };
};


const CombineViewApp = connect(
                                    mapStateToProps,
                                    mapDispatchToProps
                          )(CombineView);


export default CombineViewApp;
