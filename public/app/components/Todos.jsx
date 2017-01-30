import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionQueryBuilder from 'material-ui/svg-icons/action/query-builder';
import ActionDone from 'material-ui/svg-icons/action/done';
import Stagger from 'react-css-stagger';
import '../css/card.scss';
import axios from 'axios';

const styles = {
    list:{
        textAlign: 'center',
        minHeight: '200px'
    },
    card:{
        textAlign:'left',
    },
    wait:{
        margin:'30% 0'
    },
    span:{
        textAlign: 'left',
        wordBreak:'break-word'
    }
};


class Todos extends Component{
    render(){
        const {data} = this.props;
        const Lists = data.map((value)=>
            <ListItem primaryText={value.subtitle}
                      secondaryText={value.title}
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
