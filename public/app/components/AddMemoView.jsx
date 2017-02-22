import React, {Component} from 'react';
import {Card,CardText,Chip,IconMenu,MenuItem,TextField,SelectField,FlatButton,RaisedButton,IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionEject from 'material-ui/svg-icons/action/eject';
import v4 from 'uuid/v4';
import {MEMO,ADD_MEMO_MENU_SAVE,ADD_MEMO_MENU_SELECT_TAG,ADD_MEMO_MENU_INPUT_TAG,ADD_MEMO_MENU_CLEAR} from '../actions';

const styles = {
    tag:{
        padding:'5px 10px',
        overflow:'auto'
    },
    tagText:{
        opacity:'0.5',
        margin:'12px 0 0 20px',
        textAlign:'left'
    },
    chips:{
        float:'left',
        overflow:'auto',
        width:'80%'
    },
    chipItem:{
        float:'left',
        margin:'2px'
    },
    menu:{
        float:'right'
    },
    text:{
        textAlign:'left'
    }
}



class AddMemoView extends Component{
    newTag(){
        const {addMenuValue,addTags,storeTags,onAddMemoTagsAdd} = this.props;
        return (<div style={{padding:'10px 20px 0 20px'}}>
            {addMenuValue == ADD_MEMO_MENU_SELECT_TAG ?
                <SelectField
                    style={{textAlign:'left'}}
                    floatingLabelText="选择您的标签"
                    fullWidth={true}
                    >
                    {storeTags.length === 0?
                     <MenuItem value={null} primaryText="请手动添加标签" />:
                     storeTags.map((v,i) =>
                         <MenuItem value={v}
                                   key={`menuitem${i}`}
                                   onClick={() => onAddMemoTagsAdd(v)}
                                   primaryText={v} />)
                    }
                </SelectField>:null}
            {addMenuValue == ADD_MEMO_MENU_INPUT_TAG ?
                <div>
                    <TextField
                        style={{float:'left',width:'78%',marginTop:'20px'}}
                        ref="inputTag"
                        hintText="输入新的标签"
                        fullWidth={true}
                    />
                    <IconButton
                        style={{margin:'10px -15px 0 0',float:'right'}}
                        onClick={()=> {
                            onAddMemoTagsAdd(this.refs.inputTag.input.value);
                            this.refs.inputTag.input.value = '';
                        }}
                    >
                        <ActionEject />
                    </IconButton>
                </div>:null}
        </div>);
    }
    renderChip(label,key){
        const {onAddMemoTagsDel} = this.props;
        return <Chip
                    key={key}
                    style={styles.chipItem}
                    onRequestDelete={()=> onAddMemoTagsDel(label)}
                    >
                    {label}
               </Chip>
    }
    render(){
        const {expanded,view,usrId} = this.props;
        const {addTitle,addContent,addMenuValue,addTags,editUuid} = this.props;
        const {onAddClick,addMemoMenuOnTouch,onAddMemoTitleChange,onAddMemoContentChange,updateEditUuid} = this.props;
        const addMemoExpand = (view == MEMO && expanded);
        if(editUuid =='') updateEditUuid(v4());
        return (
            <Card expanded={addMemoExpand} >
                <CardText expandable={true}>
                    <div style={styles.tag}>
                        <div style={styles.chips}>
                            {addTags.length === 0?
                             <p style={styles.tagText}>暂无标签</p>:
                             addTags.map((i,k) => this.renderChip(i,k))}
                        </div>
                        <IconMenu
                            style={styles.menu}
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            onItemTouchTap={addMemoMenuOnTouch}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                            <MenuItem value={ADD_MEMO_MENU_SELECT_TAG} primaryText="添加新标签" />
                            <MenuItem value={ADD_MEMO_MENU_INPUT_TAG} primaryText="手动输入标签" />
                            <MenuItem value={ADD_MEMO_MENU_CLEAR} primaryText="清除内容" />
                            <MenuItem value={ADD_MEMO_MENU_SAVE}
                                      onClick={()=> onAddClick(true)}
                                      primaryText="保存备忘" />
                        </IconMenu>
                        {this.newTag()}
                    </div>
                    <TextField
                        floatingLabelText="备忘标题"
                        value={addTitle}
                        onChange={onAddMemoTitleChange}
                        />
                    <TextField
                        floatingLabelText="备忘内容"
                        style={styles.text}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        value={addContent}
                        onChange={onAddMemoContentChange}
                        />
                </CardText>
            </Card>
        );
    }
}

export default AddMemoView;
