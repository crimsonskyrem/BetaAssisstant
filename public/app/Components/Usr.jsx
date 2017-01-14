import React, {Component} from 'react';
import {MuiThemeProvider,FloatingActionButton,CircularProgress,
        Paper,BottomNavigation,BottomNavigationItem,FontIcon,Avatar,Chip} from 'material-ui';
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
};

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;

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
                        <Chip
                            style={styles.chip}>
                            <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
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
                            <h3>{this.props.params.id}</h3>
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
