import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {fetchMemos,addMemoMenuOnTouch,addMemoTitleChange,addMemoContentChange,updateEditUuid,
        addMemoTagsAdd,addMemoTagsDel,editMemo,toggleDialogView,addMemoConfirmDeleteCache,
        deleteMemo,confirmDeleteMemo,
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
        const {data,show,loading,fail,deleteOpen,deleteCache,cacheUuid,deleteObjectId} = this.props;
        const {onAddClick,onEditMemo,onToggleDeleteView,onConfirmDeleteMemo,onConfirmDeleteCache,onDeleteMemo} = this.props;
        const empty = ((data.length === 0) && show);
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={()=> onToggleDeleteView()}
            />,
            <FlatButton
                label="删除"
                primary={true}
                onTouchTap={()=> {
                        if(deleteCache){
                            onConfirmDeleteCache(cacheUuid);
                        }else{
                            onConfirmDeleteMemo(deleteObjectId);
                        }
                    }}
            />,
            ];
        return (
            <div style={styles.list}>
                <AddMemoView {...this.props}
                             {...onAddClick}
                />
                {loading && <CircularProgress size={120} thickness={5} style={styles.wait} />}
                {empty && <EmptyView />}
                {fail && <FailView />}
                {show && <MemoView
                          data={data}
                          onAddClick={onAddClick}
                          onEditMemo={onEditMemo}
                          onDeleteMemo={onDeleteMemo}
                      />}
                <Dialog
                        actions={actions}
                        modal={false}
                        open={deleteOpen}
                        onRequestClose={()=> onToggleDeleteView()}
                        >
                        {deleteCache?'添加备忘录中还有未保存的数据，要清空并编辑当前备忘吗？':
                        '确定要删除吗？'}
                </Dialog>
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
        cacheUuid:state.memoReducer.cacheUuid,
        forSaveUsrId:state.memoReducer.forSaveUsrId,
        deleteOpen:state.memoReducer.deleteOpen,
        deleteCache:state.memoReducer.deleteCache,
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
            dispatch(addMemoTagsDel(tag)),
        onEditMemo:(uuid) =>
            dispatch(editMemo(uuid)),
        onToggleDeleteView:() =>
            dispatch(toggleDialogView()),
        onConfirmDeleteCache:(uuid) =>
            dispatch(addMemoConfirmDeleteCache(uuid)),
        onDeleteMemo:(objectId) =>
            dispatch(deleteMemo(objectId)),
        onConfirmDeleteMemo:(objectId) =>
            dispatch(confirmDeleteMemo(objectId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MemoApp);
