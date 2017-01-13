var React = require('react');

class ErrMessage extends React.Component {
    render(){
        return (
            <div>
                <h2>{this.props.message}</h2>
                <span>{this.props.error}</span>
            </div>
        );
    }
}

module.exports = ErrMessage;
