import React, {Component} from 'react';
import {MuiThemeProvider,CircularProgress} from 'material-ui';
import {Card, CardActions, CardHeader,CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
        wordBreak:'break-all'
    },
    wait:{
        margin:'30% 0'
    }
};


class Memos extends Component{
    constructor(){
        super();
        this.state = {
            expanded:false,
            load:false,
            data:[]
        };
        injectTapEventPlugin();
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
        const CardList = data.map((value)=>
            <Card style={styles.card}>
                <CardHeader
                    title={value.title}
                    subtitle={value.title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <span>{value.subtitle}</span>
                </CardText>
            </Card>
        );
        return (
                <MuiThemeProvider>
                <div style={styles.list}>
                    {this.state.load?
                        <Stagger transition="card" delay={100}>
                            {CardList}
                        </Stagger>:
                        <CircularProgress size={120} thickness={5} style={styles.wait} />
                    }
                </div>
                </MuiThemeProvider>
        );
    }
}
export default Memos;
