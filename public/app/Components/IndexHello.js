import React, {Component} from 'react';
import {MuiThemeProvider,Paper,Avatar,RaisedButton,
        FontIcon} from 'material-ui';

const styles = {
    main:{
        textAlign:'center',
        margin:'15% 20px',
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
            src='./www/img/index.jpg'
            size={216}
        />
        </Paper>
);

const GitButton = () => (
        <RaisedButton
            href="https://github.com/crimsonskyrem/BetaAssisstant"
            label="GitHub Link"
            primary={true}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
);

class IndexHello extends Component{
    render(){
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <h2>汪！你好瓦！</h2>
                    <PaperCircle />
                    <h3>我是你的微信助理，贝塔！在聊天窗口回复h可以获得帮助哦～</h3>
                    <h4>觉得还不错的话，请给个star吧～</h4>
                    <GitButton />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default IndexHello;
