import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {fetchMemos,addMemoMenuOnTouch,addMemoTitleChange,addMemoContentChange} from '../actions';
import MemoView from '../components/MemoView';
import AddMemoView from '../components/AddMemoView';

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
        const {data,show,loading,fail} = this.props;
        const empty = ((data.length === 0) && show);
        return (
            <div style={styles.list}>
                <AddMemoView {...this.props} />
                {loading?<CircularProgress size={120} thickness={5} style={styles.wait} />:''}
                {empty?<EmptyView />:null}
                {fail?<FailView />:null}
                {show?<MemoView data={data}/>:null}
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
        addMenuValue:state.memoReducer.addMenuValue,
        deleteOpen:state.memoReducer.deleteOpen,
        deleteObjectId:state.memoReducer.deleteObjectId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch,
        addMemoMenuOnTouch:(e,child) =>
            dispatch(addMemoMenuOnTouch(child.props.value)),
        onAddMemoTitleChange:(e,title) =>
            dispatch(addMemoTitleChange(title)),
        onAddMemoContentChange:(e,content) =>
            dispatch(addMemoContentChange(content))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MemoApp);
