import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionQueryBuilder from 'material-ui/svg-icons/action/query-builder';
import ActionDone from 'material-ui/svg-icons/action/done';
import Stagger from 'react-css-stagger';
import '../css/card.scss';

const styles = {
    span:{
        textAlign: 'left',
        wordBreak:'break-word'
    }
};

const timeTransfer = (str) => {
    const tmp = new Date(str);
    let arr = [tmp.getFullYear(),tmp.getMonth(),tmp.getDate(),tmp.getHours(),tmp.getMinutes()];
    return `${arr[0]}年${arr[1]}月${arr[2]}日 ${arr[3]}时${arr[4]}分`;
}


class TodoView extends Component{
    render(){
        const {data} = this.props;
        const Lists = data.map((value)=>
            <ListItem key={value.objectId}
                      primaryText={value.content}
                      secondaryText={timeTransfer(value.createdAt)}
                      style={styles.span}
                      rightIcon={<ActionQueryBuilder />} />
       );
        return (
            <Stagger transition="card" delay={100}>
                {Lists}
            </Stagger>
        );
    }
}
export default TodoView;
