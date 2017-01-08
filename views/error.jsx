var React = require('react');

class ErrMessage extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.message}</h1>
                <span>{this.props.error}</span>
            </div>
        );
    }
}

module.exports = ErrMessage;
