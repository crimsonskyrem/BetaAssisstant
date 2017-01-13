import React, {Component} from 'react';
import {MuiThemeProvider,Paper,Avatar} from 'material-ui';

const styles = {
    main:{
        textAlign:'center',
        margin:'24% 20px',
    },
    paper: {
        height: 216,
        width: 216,
        margin: 'auto',
        textAlign: 'center',
        display: 'block',
    },
};
const PaperCircle = () => (
        <Paper style={styles.paper} zDepth={2} circle={true} >
        <Avatar
            src='./www/img/err.jpg'
            size={216}
        />
        </Paper>
);

class NotFound extends Component{
    render(){
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <PaperCircle />
                    <h3>什么都没有汪！</h3>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default NotFound;
