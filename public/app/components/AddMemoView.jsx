import React, {Component} from 'react';
import {Card,CardText,CardActions,TextField,Checkbox,RaisedButton} from 'material-ui';
import v4 from 'uuid/v4';
import {MEMO} from '../actions';


class AddMemoView extends Component{
    render(){
        const {expanded,view,usrId,addTitle,addContent} = this.props;
        const addMemoExpand = (view == MEMO && expanded);
        return (
            <Card expanded={addMemoExpand} >
                <CardText expandable={true}>
                    <TextField
                        hintText="请在此输入您的备忘标题"
                        />
                    <TextField
                        hintText="请在此输入您的备忘内容"
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
