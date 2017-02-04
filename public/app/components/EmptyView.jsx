import React, {Component} from 'react';
import {Paper,Avatar} from 'material-ui';

const styles = {
    main:{
        textAlign:'center',
        margin:'24% 20px',
        opacity:'0.6'
    },
    paper: {
        height: 216,
        width: 216,
        margin: 'auto',
        textAlign: 'center',
        display: 'block'
    },
};
const PaperCircle = () => (
        <Paper style={styles.paper} zDepth={2} circle={true} >
        <Avatar
            src='./img/empty.jpg'
            size={216}
        />
        </Paper>
);

class EmptyView extends Component{
    render(){
        return (
            <div style={styles.main}>
                <PaperCircle />
                <h3>您的记录是空的汪！</h3>
            </div>
        );
    }
}
export default EmptyView;
