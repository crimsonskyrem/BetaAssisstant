import React, {Component} from 'react';
import {List, ListItem,RaisedButton} from 'material-ui';
import {fullWhite,lightGreen400,lightBlue400,red400} from 'material-ui/styles/colors';
import SwipeableViews from 'react-swipeable-views';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';

const styles = {
    span:{
        textAlign: 'left',
        wordBreak:'break-word'
    },
    withOpacity:{
        opacity:'0.5'
    },
    slideContainer:{
        background:'white',
        borderBottom:'1px solid #eee'
    },
    menu:{
        height:'100%'
    },
    button:{
        height:'100%',
        minWidth:'120px',
        float:'right'
    }
};

const timeTransfer = (str) => {
    if(str==undefined)return '数据保存中...';
    const tmp = new Date(str);
    if(tmp == 'Invalid Date') return str;
    let arr = [tmp.getFullYear(),tmp.getMonth(),tmp.getDate(),tmp.getHours(),tmp.getMinutes()];
    return `${arr[0]}年${arr[1]}月${arr[2]}日 ${arr[3]}时${arr[4]}分`;
}

class TodoItemView extends Component{
    render(){
        const {value,onToggleTodo,onDeleteTodo,onSwipeTodoTab} = this.props;
        const sv = this.refs.sv;
        if(value==undefined) return null;
        const opacity = value.processing || false;
        const leftIcon = value.completed?
                         <ActionCheckCircle />:
                         <ActionSchedule />;
        const buttonIcon = value.completed?
                         <ActionCheckCircle color={fullWhite}/>:
                         <ActionSchedule color={fullWhite}/>;
        const buttonColor = value.completed?lightGreen400:lightBlue400;
        return (
            <SwipeableViews index={value.tabIndex}
                            ref='sv'
                            onChangeIndex={(v)=> onSwipeTodoTab(value.uuid,v)}
                            slideStyle={styles.slideContainer}
                            >
                <div>
                <ListItem
                    key={`li${value.uuid}`}
                    primaryText={value.content}
                    secondaryText={timeTransfer(value.updatedAt)}
                    style={opacity?Object.assign({},styles.span,styles.withOpacity):styles.span}
                    leftIcon={leftIcon}
                />
                </div>
                <div style={styles.menu}>
                    <RaisedButton label={<ActionDelete color={fullWhite}/>}
                                  backgroundColor={red400}
                                  onClick={()=>{sv.setState({indexCurrent:0});onDeleteTodo(value.uuid);}}
                                  style={Object.assign({},styles.button,{minWidth:'140px'})} />
                    <RaisedButton label={buttonIcon}
                                  backgroundColor={buttonColor}
                                  onClick={()=> {onToggleTodo(value.uuid);sv.setState({indexCurrent:0});}}
                                  style={styles.button} />
                </div>
            </SwipeableViews>
        );
    }
}

export default TodoItemView;
