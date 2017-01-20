import React, {Component} from 'react';
import {MuiThemeProvider,AppBar,IconButton} from 'material-ui';
import Assignment from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Memos from './Memos';
import Todos from './Todos';
import { createStore } from 'redux';

const styles = {
    main:{
        margin:'10px',
    },
}

class Usr extends Component{
    render(){
        return (
            <div style={styles.main}>
                <MuiThemeProvider>
                    <AppBar
                        title={<span >MemoList</span>}
                        iconElementLeft={<IconButton><Assignment /></IconButton>}
                        iconElementRight={<IconButton><ContentAdd /></IconButton>}
                    />
                </MuiThemeProvider>
                <Todos id={this.props.params.id} />
            </div>
       );
    }
}
export default Usr;
