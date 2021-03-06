import React, {Component} from 'react';
import MemoItemView from './MemoItemView';


class MemoView extends Component{
    render(){
        const {data,onEditMemo,onAddClick,onDeleteMemo} = this.props;
        const list = data.map((item,i) => <MemoItemView
                                              key={i}
                                              value={item}
                                              onAddClick={onAddClick}
                                              onEditMemo={onEditMemo}
                                              onDeleteMemo={onDeleteMemo}
                                          />);
        return(
            <div>
                {list}
            </div>
        );
    }
}

export default MemoView;
