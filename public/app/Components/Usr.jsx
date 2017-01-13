import React, {Component} from 'react';

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
    render(){
        return (
                <div style={styles.main}>
                    <h3>this is usr page</h3>
                    <h3>{this.props.params.id}</h3>
                </div>
        );
    }
}
export default Usr;
