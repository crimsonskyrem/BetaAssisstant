import React, {Component} from 'react';
import {Card, CardActions, CardHeader,CardText} from 'material-ui/Card';
import {RaisedButton} from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';

const styles = {
    chipItem:{
        float:'left',
        margin:'5px 2px 0 2px'
    },
    card:{
        textAlign:'left',
        wordBreak:'break-word'
    },
    button:{
        margin:'15px 0 -22px',
        textAlign:'right',
        overflow:'auto'
    },
    half:{
        width:'50%',
        float:'left'
    }
}

class MemoItemView extends Component{
    renderChip(label,key){
        return `【${label}】`
    }
    render(){
        const {value,onEditMemo,onAddClick} = this.props;
        let itemTags = [];
        if(value.tags !== undefined && value.tags !== '')
            itemTags = value.tags.split(',');
        let subtitle = value.content.length > 26 ?
                       value.content.substr(0,26) + '...':
                       value.content;
        return (
                <Card style={styles.card}>
                    <CardHeader
                        title={value.title || subtitle}
                        subtitle={itemTags.map((v,i)=>
                            this.renderChip(v,i)
                         )}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {value.content}
                        <div style={styles.button}>
                            <div style={styles.half}>
                                <RaisedButton
                                    fullWidth={true}
                                    icon={<EditorEdit />}
                                    onTouchTap={()=>{
                                            onAddClick(false);
                                            onEditMemo(value.uuid);
                                        }}
                                />
                            </div>
                            <div style={styles.half}>
                            <RaisedButton fullWidth={true} icon={<ActionDelete />} />
                            </div>
                        </div>
                    </CardText>
                </Card>
        );
    }
}

export default MemoItemView;
