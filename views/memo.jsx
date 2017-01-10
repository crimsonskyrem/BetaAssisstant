var React = require('react');
import Perf from 'react-addons-test-utils';
import {Container,Group,List} from 'amazeui-touch';

//class Memo extends React.Component {
//    render() {
//        const listItems = this.props.data.map((value)=>
//            <li key={value[0]}>{value[1]}</li>);
//        return (
//            <ul>
//                {listItems}
//            </ul>);
//    }
//}
class Memo extends React.Component {
    render(){
        return (
            <Container>
                <Group
                    header="备忘"
                >
                    <List>
                        {this.props.data.map((value)=>{
                            return (<List.Item
                                title={value[1]}
                                key={value[0]}
                            />);
                        })}
                    </List>
                </Group>
            </Container>
        );
    }
}

module.exports = Memo;
