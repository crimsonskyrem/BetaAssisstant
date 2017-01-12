import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

const style = {
    height: 216,
    width: 216,
    margin: 'auto',
    textAlign: 'center',
    display: 'block',
};

const PaperCircle = (props) => (
        <div>
        <Paper style={style} zDepth={2} circle={true} >
        <Avatar
            src={props.src}
            size={216}
        />
        </Paper>
        </div>
);

export default PaperCircle;
