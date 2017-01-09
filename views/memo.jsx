var React = require('react');

class Memo extends React.Component {
    render() {
        const listItems = this.props.data.map((value)=>
            <li key={value[0]}>{value[1]}</li>);
        return (
            <ul>
                {listItems}
            </ul>);
    }
}

module.exports = Memo;
