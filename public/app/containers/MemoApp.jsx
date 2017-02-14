import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {fetchMemos} from '../actions';
import MemoView from '../components/MemoView';

const styles = {
    list:{
        textAlign: 'center',
        minHeight: '200px'
    },
    wait:{
        margin:'30% 0'
    }
}

class MemoApp extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        const {dispatch,usrId} = this.props;
        dispatch(fetchMemos(usrId));
    }
    render(){
        const {data,loading,show,fail} = this.props;
        const empty = ((data.length === 0) && show);
        return (
            <div style={styles.list}>
                {loading?<CircularProgress size={120} thickness={5} style={styles.wait} />:''}
                {empty?<EmptyView />:''}
                {fail?<FailView />:''}
                {show?<MemoView data={data}/>:''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading:state.memoReducer.loading,
        show:state.memoReducer.show,
        fail:state.memoReducer.fail,
        data:state.memoReducer.data,
        addTitle:state.memoReducer.addTitle,
        addContent:state.memoReducer.addContent,
        addTags:state.memoReducer.addTags,
        deleteOpen:state.memoReducer.deleteOpen,
        deleteObjectId:state.memoReducer.deleteObjectId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch
    }
}

export default connect(mapStateToProps)(MemoApp);
