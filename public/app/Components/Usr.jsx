import React, {Component} from 'react';
import {MuiThemeProvider,FloatingActionButton,CircularProgress,
        Paper,BottomNavigation,BottomNavigationItem,FontIcon,Avatar,Chip} from 'material-ui';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import ContentAdd from 'material-ui/svg-icons/content/add';
import axios from 'axios';

const styles = {
    main:{
        margin:'10px',
    },
    header: {
        margin: 'auto',
        textAlign: 'center',
        display: 'block',
    },
    chip:{
        float:'left',
        marginTop:'5px'
    },
    fab:{
        float:'right'
    },
    list:{
        paddingTop:'2em',
        textAlign: 'center',
    },
    card:{
        textAlign:'left'
    }
};

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;

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
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <div style={styles.header}>
                        <Chip
                            style={styles.chip}>
                            <Avatar icon={<SvgIconFace />} />
                            记事列表
                        </Chip>
                        <FloatingActionButton mini={true} style={styles.fab}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <br />
                        <br />
                    </div>
                    <div style={styles.list}>
                            {this.state.load?CardList:
                                <CircularProgress size={120} thickness={5} />
                            }
                    </div>
                    <div>
                        <Paper zDepth={1}>
                            <BottomNavigation selectedIndex={0}>
                            <BottomNavigationItem
                                label="Recents"
                                icon={recentsIcon}
                            />
                            </BottomNavigation>
                        </Paper>
                    </div>
              </div>
            </MuiThemeProvider>
        );
    }
}
export default Usr;
