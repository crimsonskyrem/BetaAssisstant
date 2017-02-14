import React, {Component} from 'react';
import {Card, CardActions, CardHeader,CardText} from 'material-ui/Card';

const styles = {
    card:{
        textAlign:'left',
        wordBreak:'break-word'
    }
}

class MemoItemView extends Component{
    render(){
        const {value} = this.props;
        return (
                <Card style={styles.card}>
                    <CardHeader
                        title={value.title}
                        subtitle={value.content}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <span>{value.content}</span>
                    </CardText>
                </Card>
        );
    }
}

export default MemoItemView;
