import {connect} from 'react-redux';
import {ADD_TODO,TOGGLE_TODO} from '../actions';
import Todos from '../components/Todos';

const mapStateToProps = (state) => {
    return {
        load:state.load,
        data:state.data
    };
};
