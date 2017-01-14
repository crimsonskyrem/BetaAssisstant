import React, {Component} from 'react';
import {MuiThemeProvider,FloatingActionButton,CircularProgress} from 'material-ui';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
    main:{
        margin:'10px',
    },
    header: {
        margin: 'auto',
        textAlign: 'center',
        display: 'block',
    },
    list:{
        paddingTop:'2em',
        textAlign: 'center',
    }
};

class Usr extends Component{
    constructor(props){
        super(props);
        this.state = {
            load:false,
            data:[
                {title:'test1',subtitle:'subtest1'},
                {title:'test2',subtitle:'subtest2'},
                {title:'test3',subtitle:'subtest3'},
            ]
        };
    }
    render(){
        const {data} = this.state;
        const CardList = data.map((value)=>
            <Card>
                <CardHeader
                title={value.title}
                subtitle={value.subtitle}
                />
            </Card>
        );
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <div style={styles.header}>
                        <FloatingActionButton mini={true}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                    <div style={styles.list}>
                        {this.state.load?CardList:
                            <CircularProgress size={120} thickness={5} />
                        }
                        <h3>{this.props.params.id}</h3>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default Usr;
