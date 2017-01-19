import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton,FloatingActionButton,CircularProgress,
        FontIcon} from 'material-ui';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import Assignment from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Stagger from 'react-css-stagger';
import '../css/card.scss';
import axios from 'axios';
import { createStore } from 'redux';

const styles = {
    main:{
        margin:'10px',
    },
    header: {
        margin: 'auto',
        textAlign: 'center',
        display: 'block',
    },
    fab:{
        float:'right'
    },
    list:{
        textAlign: 'center',
        minHeight: '200px'
    },
    card:{
        textAlign:'left'
    },
    wait:{
        margin:'30% 0'
    }
};


class Usr extends Component{
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
            usr: component.props.params.id,
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
                subtitle={value.subtitle}
                />
            </Card>
        );
        const flatButton = (
            <FloatingActionButton mini={true} style={styles.fab}>
            </FloatingActionButton>
        );
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <div style={styles.header}>
                        <AppBar
                            title={<span >MemoList</span>}
                            iconElementLeft={<IconButton><Assignment /></IconButton>}
                            iconElementRight={<IconButton><ContentAdd /></IconButton>}
                        />
                    </div>
                    <div style={styles.list}>
                        {this.state.load?
                            <Stagger transition="card" delay={100}>
                                {CardList}
                            </Stagger>:
                            <CircularProgress size={120} thickness={5} style={styles.wait} />
                        }
                    </div>
              </div>
            </MuiThemeProvider>
        );
    }
}
export default Usr;
