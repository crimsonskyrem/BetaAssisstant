import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress,Dialog,FlatButton} from 'material-ui';
import {fetchMemos} from '../actions';
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
        const {usrId,expanded,view,data,loading,show,fail} = this.props;
        const {addTitle,addContent,addTags,addMenuValue} = this.props;
        const {onAddClick} = this.props;
        const empty = ((data.length === 0) && show);
        return (
            <div style={styles.list}>
                <AddMemoView usrId={usrId}
                             expanded={expanded}
                             view={view}
                             addTitle={addTitle}
                             addTags={addTags}
                             addContent={addContent}
                             addMenuValue={addMenuValue}
                             onAddClick={onAddClick}
                             />
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
        addMenuValue:state.memoReducer.addMenuValue,
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
