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
    }
};

class AddTodoView extends Component{
    constructor(){
        super();
        this.state = {
            content:'',
            completed:false
        }
    }
    checkBox(event,checked){
        this.setState({
            completed:checked
        });
    }
    textChange(event,newVal){
        this.setState({
            content:newVal
        });
    }
    onClick(){
        const {onAddClick,onSaveClick,usrId} = this.props;
        const data = {
            content:this.state.content,
            completed:this.state.completed,
            usrId:usrId,
            uuid:v4()
        }
        onSaveClick(data);
        this.setState({
                    content:'',
                    completed:false
                });
        onAddClick(true);
    }

    render(){
        const {expanded} = this.props;
        return (
                <Card expanded={expanded}>
                    <CardText expandable={true}>
                    <TextField
                        style={styles.textField}
                        value={this.state.content}
                        floatingLabelText="请在此输入您的代办事项"
                        hintText="输入的文字不宜过多，记事请转入备忘录"
                        multiLine={true}
                        fullWidth={true}
                        rows={2}
                        rowsMax={4}
                        onChange={this.textChange.bind(this)}
                        />
                    </CardText>
                    <CardActions expandable={true}
                                 style={styles.block}>
                    <Checkbox   style={styles.checkBox}
                                label={this.state.completed?'已完成':'未完成'}
                                labelPosition="left"
                                checked={this.state.completed}
                                onCheck={this.checkBox.bind(this)}
                    />
                    <RaisedButton label="保存"
                                  style={styles.button}
                                  onClick={this.onClick.bind(this)}/>
                    </CardActions>
                </Card>
        );
    }
}

export default AddTodoView;
