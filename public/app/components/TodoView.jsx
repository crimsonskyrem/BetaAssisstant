import React, {Component} from 'react';
import {List, ListItem,IconButton,IconMenu,MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import Stagger from 'react-css-stagger';
import '../css/card.scss';

const styles = {
    span:{
        textAlign: 'left',
        wordBreak:'break-word',
        backgroundColor:'snow',
        margin:'2px 0'
    },
    spanWithOpacity:{
        textAlign: 'left',
        wordBreak:'break-word',
        backgroundColor:'snow',
        margin:'2px 0',
        opacity:'0.5'
    }
};

const timeTransfer = (str) => {
    if(str==undefined)return '数据保存中...';
    const tmp = new Date(str);
    if(tmp == 'Invalid Date') return str;
    let arr = [tmp.getFullYear(),tmp.getMonth(),tmp.getDate(),tmp.getHours(),tmp.getMinutes()];
    return `${arr[0]}年${arr[1]}月${arr[2]}日 ${arr[3]}时${arr[4]}分`;
}


class TodoView extends Component{
    render(){
        const {data,onToggleTodo} = this.props;
        const Lists = data.map((value)=> {
            const opacity = value.processing || false;
            const leftIcon = value.completed?
                                        <ActionCheckCircle />:
                                        <ActionSchedule />;
            const iconButtonElement = (
            <IconButton touch={true} >
                <MoreVertIcon />
            </IconButton>
            );

            const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={()=>onToggleTodo(value.uuid)}>
                    {value.completed?'设为未完成':'设为已完成'}
                </MenuItem>
                <MenuItem>编辑</MenuItem>
                <MenuItem>删除</MenuItem>
            </IconMenu>
            );

            return <ListItem
            key={value.uuid}
            primaryText={value.content}
            secondaryText={timeTransfer(value.updatedAt)}
            style={opacity?styles.spanWithOpacity:styles.span}
            leftIcon={leftIcon}
            rightIconButton={rightIconMenu}
            />
       });
        return (
            <Stagger transition="card" delay={100}>
                {Lists}
            </Stagger>
        );
    }
}
export default TodoView;
