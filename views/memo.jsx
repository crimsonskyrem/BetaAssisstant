var React = require('react');

class Memo extends React.Component {
  render() {
    return <div>Hello {this.props.data}</div>;
  }
}

module.exports = Memo;
