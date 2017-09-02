import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import fakeData from './fakeData';
import ImageBlock from '~/pureComponents/ImageBlock';
const roomTypeList = fakeData;
require('./cardtree.less');
const deviceArr = [{
    icon: 'fa fa-cloud',
    name: '煙霧感應器'
}, {
    icon: 'fa fa-lightbulb-o',
    name: '亮度感應器'
}, {
    icon: 'fa fa-microchip',
    name: '門窗感應器'
}, {
    icon: 'fa fa-microchip',
    name: '移動感應器'
}, {
    icon: 'fa fa-lightbulb-o',
    name: '電燈'
}];

class CardTree extends Component {
    constructor(props) {
        super(props);
        this.stepStatus = {
            1: this.returnDefaultState()
        };
        this.state = this.returnDefaultState();
    }
    returnDefaultState = () => {
        return ({
            roomType_id: null,
            roomType_index: null,
            roomType_name: null,
            room_id: null,
            room_index: null,
            room_name: null,
            step: 1,
            breadcrumb: ['root'],
            active_index: null
        });
    }
    rippleClick = (target, ripple, index, e, newState) => {
        //處理ripple 定位
        const rect = target.getBoundingClientRect();
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'; // 設定完範圍後才抓offset 才不會計算錯誤
        const top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        const left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';

        this.setState({
            active_index: index
        }, () => {
            setTimeout(() => {
                this.setState(newState ? newState : { active_index: null });
            }, 300)
        });
    }

    handleChange = (key, value, index, step, target, ripple, e) => {
        var newState = Object.assign({}, this.state);
        newState[key] = value;
        var pushName = null;
        if (key === 'roomType_id') {
            newState.roomType_index = index;
            newState.roomType_name = roomTypeList[index].name;
            pushName = newState.roomType_name;
        } else if (key === 'room_id') {
            newState.room_index = index;
            newState.room_name = roomTypeList[this.state.roomType_index].rooms[index].no;
            pushName = newState.room_name;
        }

        //處理麵包屑
        newState.step = step;
        var breadcrumb = this.state.breadcrumb.slice(0);
        breadcrumb.push(pushName);
        newState.breadcrumb = breadcrumb;
        newState.active_index = null;
        this.stepStatus[step] = newState;
        this.rippleClick(target, ripple, index, e, newState);
    }
    
    changeStep = (e, index) => {
        if (e) { e.preventDefault(); }
        this.setState(this.stepStatus[index]);
    }

    render() {
        return (
            <div id="cardTree" className="container-fluid pt-150">
                <div className="fixedControl">
                    <div className="breadcrumb">
                        <ReactCSSTransitionGroup
                            transitionName="breadCrumb"
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            {this.state.breadcrumb.map((item, g) =>
                                <a href="#" onClick={(e) => this.changeStep(e, g + 1)} className="breadTitle" key={"breadcrumb" + g}>
                                    {g === 0 ? <i className="fa fa-home fa-2x"></i> : <span>{item}</span>} <i className="fa fa-angle-right fa-2x"></i>
                                </a>)}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                {this.state.step === 1
                    ? <div className="row">
                        <QueueAnim className="queue-simple">
                            {roomTypeList.map((roomtype, k) =>
                                <ImageBlock
                                    key={roomtype._id + k}
                                    index={k}
                                    title={roomtype.name}
                                    visible={this.state.active_index === k}
                                    onClick={(target, ripple, index, e) => this.handleChange('roomType_id', roomtype._id, k, 2, target, ripple, e)}
                                />)}
                        </QueueAnim>
                    </div>
                    : null}

                {this.state.step === 2
                    ? <div className={"row"}>
                        <QueueAnim className="queue-simple">
                            {roomTypeList[this.state.roomType_index].rooms.length
                                ? roomTypeList[this.state.roomType_index].rooms.map((rooms, k) =>
                                    <ImageBlock
                                        key={rooms._id}
                                        index={k}
                                        title={rooms.no}
                                        visible={this.state.active_index === k}
                                        onClick={(target, ripple, index, e) => this.handleChange('room_id', rooms._id, k, 3, target, ripple, e)}
                                    />
                                ) : <div className="col-xs-12"><p>尚未新增任何房間</p></div>}
                        </QueueAnim>
                    </div>
                    : null}

                {this.state.step === 3
                    ? <div className="row">
                        <QueueAnim className="queue-simple">
                            {deviceArr.map((device, k) =>
                                <ImageBlock
                                    key={'device' + k}
                                    index={k}
                                    iconClass={device.icon}
                                    disabled={true}
                                    title={device.name}
                                    visible={this.state.active_index === k}
                                    onClick={this.rippleClick}
                                />)}
                        </QueueAnim>
                    </div>
                    : null}
            </div>
        );
    }
}

export default CardTree;