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

class AddTodosCard extends Component{

    render(){
        const {expanded,toggle} = this.props;
        return (
                <Card expanded={expanded}>
                    <CardText expandable={true}>
                    <TextField
                        floatingLabelText="Type your todos here"
                        hintText="MultiLine with rows: 2 and rowsMax: 4"
                        multiLine={true}
                        fullWidth={true}
                        rows={2}
                        rowsMax={4}
                        />
                    </CardText>
                    <CardActions expandable={true}
                                 style={styles.block}>
                    <Checkbox   style={styles.checkBox}
                                label="Finished"
                                labelPosition="left"
                    />
                    <RaisedButton label="Save"
                                  style={styles.button}
                                  onClick={()=>toggle(expanded)}/>
                    </CardActions>
                </Card>
        );
    }
}

export default AddTodosCard;
