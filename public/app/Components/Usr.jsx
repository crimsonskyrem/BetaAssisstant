import React, {Component} from 'react';
import {MuiThemeProvider,Drawer,MenuItem,RaisedButton} from 'material-ui';

const styles = {
    main:{
        textAlign:'center',
        margin:'20% 20px',
    },
    paper: {
        height: 216,
        width: 216,
        margin: 'auto',
        textAlign: 'center',
        display: 'block',
    },
};

class Usr extends Component{
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle(){
        this.setState({open: !this.state.open});
    }
    handleClose(){
        this.setState({open: false});
    }

    render(){
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <RaisedButton
                        label="Open Drawer"
                        onTouchTap={this.handleToggle}
                        />
                    <Drawer
                    docked={false}
                    width={20}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <h3>this is usr page</h3>
                    <h3>{this.props.params.id}</h3>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default Usr;
