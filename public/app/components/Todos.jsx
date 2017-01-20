import React, {Component} from 'react';
import {MuiThemeProvider,CircularProgress} from 'material-ui';
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
    constructor(){
        super();
        this.state = {
            load:false,
            data:[]
        };
    }
    componentDidMount(){
        const component = this;
        axios.post('/json', {
            usr: component.props.id,
       }).then(function (response) {
            component.setState({
                load:true,
                data:response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }
    render(){
        const {data} = this.state;
        const Lists = data.map((value)=>
            <ListItem primaryText={value.subtitle}
                      secondaryText={value.title}
                      style={styles.span}
                      rightIcon={<ActionQueryBuilder />} />
       );
        return (
                <MuiThemeProvider>
                <div style={styles.list}>
                    {this.state.load?
                        <Stagger transition="card" delay={100}>
                            {Lists}
                        </Stagger>:
                        <CircularProgress size={120} thickness={5} style={styles.wait} />
                    }
                </div>
                </MuiThemeProvider>
        );
    }
}
export default Todos;
