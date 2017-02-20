import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {fetchMemos,addMemoMenuOnTouch,addMemoTitleChange,addMemoContentChange,updateEditUuid,
        addMemoTagsAdd,addMemoTagsDel,
        } from '../actions';
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
        const {data,show,loading,fail,onAddClick} = this.props;
        const empty = ((data.length === 0) && show);
        return (
            <div style={styles.list}>
                <AddMemoView {...this.props}
                             {...onAddClick}
                />
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
        storeTags:state.memoReducer.storeTags,
        addMenuValue:state.memoReducer.addMenuValue,
        editUuid:state.memoReducer.editUuid,
        deleteOpen:state.memoReducer.deleteOpen,
        deleteObjectId:state.memoReducer.deleteObjectId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch:dispatch,
        updateEditUuid:(uuid) =>
            dispatch(updateEditUuid(uuid)),
        addMemoMenuOnTouch:(e,child) =>
            dispatch(addMemoMenuOnTouch(child.props.value)),
        onAddMemoTitleChange:(e,title) =>
            dispatch(addMemoTitleChange(title)),
        onAddMemoContentChange:(e,content) =>
            dispatch(addMemoContentChange(content)),
        onAddMemoTagsAdd:(tag) =>
            dispatch(addMemoTagsAdd(tag)),
        onAddMemoTagsDel:(tag) =>
            dispatch(addMemoTagsDel(tag))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MemoApp);
