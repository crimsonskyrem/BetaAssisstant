import React, {Component} from 'react';
import {Card,CardText,Chip,IconMenu,MenuItem,TextField,SelectField,FlatButton,RaisedButton,IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionEject from 'material-ui/svg-icons/action/eject';
import v4 from 'uuid/v4';
import {MEMO} from '../actions';

const styles = {
    tag:{
        padding:'5px 10px',
        overflow:'auto'
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
        const {addMenuValue,addTags} = this.props;
        return (<div style={{padding:'10px 20px 0 20px'}}>
            {addMenuValue == '2'?
                <div>
                    <TextField
                        style={{float:'left',width:'78%'}}
                        hintText="输入新的标签"
                        fullWidth={true}
                    />
                    <IconButton
                        style={{marginLeft:'5px',float:'right'}}
                    >
                        <ActionEject />
                    </IconButton>
                </div>:
                <SelectField
                    style={{textAlign:'left'}}
                    floatingLabelText="选择您的标签"
                    fullWidth={true}
                    >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField>
            }
        </div>);
    }
    renderChip(label,key){
        return <Chip
                    key={key}
                    style={styles.chipItem}
                    onRequestDelete={()=> alert('test')}
                    >
                    {label}
               </Chip>
    }
    render(){
        const {expanded,view,usrId} = this.props;
        const {addTitle,addContent,addTags,addMenuValue} = this.props;
        const addMemoExpand = (view == MEMO && expanded);
        return (
            <Card expanded={addMemoExpand} >
                <CardText expandable={true}>
                    <div style={styles.tag}>
                        <div style={styles.chips}>
                            {['label1','l2','la3','sdfasdf'].map((i,k) => this.renderChip(i,k))}
                        </div>
                        <IconMenu
                            style={styles.menu}
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            >
                            <MenuItem value="1" primaryText="添加新标签" />
                            <MenuItem value="2" primaryText="手动输入标签" />
                            <MenuItem value="3" primaryText="保存备忘" />
                        </IconMenu>
                        {this.newTag()}
                    </div>
                    <TextField
                        floatingLabelText="备忘标题"
                        />
                    <TextField
                        floatingLabelText="备忘内容"
                        style={styles.text}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        />
                </CardText>
            </Card>
        );
    }
}

export default AddMemoView;
