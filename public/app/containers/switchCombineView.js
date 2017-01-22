import {connect} from 'react-redux';
import CombineView from '../components/CombineView';
import {switchTodoMemo} from '../actions';

const mapStateToProps = (state) => {
    return {
        view:state.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchClick: (view) => {
            dispatch(switchTodoMemo(view));
        }
    };
};


const SwitchCombineView = connect(
                                    mapStateToProps,
                                    mapDispatchToProps
                                )(CombineView);


export default SwitchCombineView;
