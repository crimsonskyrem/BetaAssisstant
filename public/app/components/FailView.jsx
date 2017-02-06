import React, {Component} from 'react';
import {Paper,Avatar,RaisedButton} from 'material-ui';

const styles = {
    main:{
        textAlign:'center',
        margin:'24% 20px',
        opacity:'0.9'
    },
    paper: {
        height: 216,
        width: 216,
        margin: 'auto',
        textAlign: 'center',
        display: 'block'
    }
};
const PaperCircle = () => (
        <Paper style={styles.paper} zDepth={2} circle={true} >
        <Avatar
            src='./img/fail.jpg'
            size={216}
        />
        </Paper>
);

class FailView extends Component{
    render(){
        return (
            <div style={styles.main}>
                <PaperCircle />
                <h3>加载数据失败了嗷呜！</h3>
                <RaisedButton label="重试"
                              primary={true}
                              onClick={()=>window.location.reload()} />
            </div>
        );
    }
}
export default FailView;
