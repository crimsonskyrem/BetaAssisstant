import React, {Component} from 'react';
import {Card, CardActions, CardHeader,CardText} from 'material-ui/Card';
import {Chip} from 'material-ui';

const styles = {
    chipItem:{
        float:'left',
        margin:'5px 2px 0 2px'
    },
    card:{
        textAlign:'left',
        wordBreak:'break-word'
    }
}

class MemoItemView extends Component{
    renderChip(label,key){
        return `【${label}】`
    }
    render(){
        const {value} = this.props;
        let itemTags = [];
        if(value.tags !== undefined && value.tags !== '')
            itemTags = value.tags.split(',');
        let subtitle = value.content.substr(0,20) + '...';
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
                    </CardText>
                </Card>
        );
    }
}

export default MemoItemView;
