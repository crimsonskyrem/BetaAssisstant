import {connect} from 'react-redux';
import CombineView from '../components/CombineView';
import {TODO,
        switchTodoMemo,addButtonClick} from '../actions';

const mapStateToProps = (state) => {
    return {
        view:state.switchTodoMemo.view,
        addExpanded:state.switchTodoMemo.addExpanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchClick: (view) => {
            dispatch(switchTodoMemo(view));
        },
        onAddClick: (addExpanded) => {
            dispatch(addButtonClick(addExpanded));
        }
    };
};


const CombineViewApp = connect(
                                    mapStateToProps,
                                    mapDispatchToProps
                          )(CombineView);


export default CombineViewApp;
