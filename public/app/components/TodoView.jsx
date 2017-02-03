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


class Todos extends Component{
    render(){
        const {data} = this.props;
        const Lists = data.map((value)=>
            <ListItem primaryText={value.content}
                      secondaryText={value.createdAt}
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
export default Todos;
