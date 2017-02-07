import React, {Component} from 'react';
import {Card,CardText,CardActions,TextField,Checkbox,RaisedButton} from 'material-ui';
import v4 from 'uuid/v4';

const styles = {
    textField:{
        textAlign:'left'
    },
    block:{
        overflow:'auto',
        paddingButtom:'5px'
    },
    checkBox:{
        float:'left',
        width:'40%',
        margin:'6px 0 0 10px'
    },
    button:{
        float:'right',
    },
    bottom:{
        borderBottom:'1px solid #eee',
        marginBottom:'4px'
    }
};

class AddTodoView extends Component{
        render(){
        const {expanded,usrId,addContent,addCompleted} = this.props;
        const {onAddContentChange,onAddCheckCompleted,onAddClick,onSaveClick} = this.props;
        const saveButtonClick = (usrId) => {
                const data = {usrId:usrId,
                              uuid:v4(),
                              content:addContent,
                              completed:addCompleted};
                onSaveClick(data);
                onAddClick(true);
        }

        return (
                <Card expanded={expanded} style={styles.bottom}>
                    <CardText expandable={true}>
                    <TextField
                        style={styles.textField}
                        value={addContent}
                        floatingLabelText="请在此输入您的代办事项"
                        hintText="输入的文字不宜过多，记事请转入备忘录"
                        multiLine={true}
                        fullWidth={true}
                        rows={2}
                        rowsMax={4}
                        onChange={onAddContentChange}
                        />
                    </CardText>
                    <CardActions expandable={true}
                                 style={styles.block}>
                    <Checkbox   style={styles.checkBox}
                                label={addCompleted?'已完成':'未完成'}
                                labelPosition="left"
                                checked={addCompleted}
                                onCheck={onAddCheckCompleted}
                    />
                    <RaisedButton label="保存"
                                  style={styles.button}
                                  onClick={()=>saveButtonClick(usrId)}/>
                    </CardActions>
                </Card>
        );
    }
}

export default AddTodoView;
