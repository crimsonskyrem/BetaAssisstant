import React, {Component} from 'react';
import {Card,CardText,CardActions,TextField,Checkbox,RaisedButton} from 'material-ui';

const styles = {
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
            todoText:'',
            finished:false
        }
    }
    checkBox(event,checked){
        this.setState({
            finished:checked
        });
    }
    textChange(event,newVal){
        this.setState({
            todoText:newVal
        });
    }

    render(){
        const {expanded,onAddClick} = this.props;
        return (
                <Card expanded={expanded}>
                    <CardText expandable={true}>
                    <TextField
                        value={this.state.todoText}
                        floatingLabelText="Type your todos here"
                        hintText="MultiLine with rows: 2 and rowsMax: 4"
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
                                label="Finished"
                                labelPosition="left"
                                checked={this.state.finished}
                                onCheck={this.checkBox.bind(this)}
                    />
                    <RaisedButton label="Save"
                                  style={styles.button}
                                  onClick={()=>onAddClick(expanded)}/>
                    </CardActions>
                </Card>
        );
    }
}

export default AddTodoView;
