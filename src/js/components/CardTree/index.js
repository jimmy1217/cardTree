import React, { Component } from 'react';
import fakeData from './fakeData';
const roomTypeList = fakeData;
require('./cardtree.less');

class CardTree extends Component {
    constructor(props) {
        super(props);
        this.stepStatus = {
            1: this.returnDefaultState()
        };
        this.state = this.returnDefaultState();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
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

    handleChange = (key, value, index, step, e) => {
        //ripple 定位
        const target = this.refs['block' + index];
        const rect = target.getBoundingClientRect();
        const ripple = this.refs['ripple' + index];
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'; // 設定完範圍後才抓offset 才不會計算錯誤
        const top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        const left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        //ripple -- end

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
        //處理麵包屑 end
        this.setState({
            active_index: index
        }, () => {
            setTimeout(() => {
                this.setState(newState);
            }, 300)
        });
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
                        {
                            roomTypeList.map((roomtype, k) => {
                                return <div key={roomtype._id} className="col-xs-12 col-sm-6 mb-20" onClick={(e) => this.handleChange('roomType_id', roomtype._id, k, 2, e)}>
                                    <div className={classNames("cardBlock")}><span className="blockTitle">{roomtype.name}</span>
                                        <div ref={"block" + k} className={"custom-image bg-img bg-img" + k % 4} />
                                        <span ref={"ripple" + k} className={classNames("ripple", { show: this.state.active_index === k })}></span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    : null}

                {this.state.step === 2
                    ? <div className={"row"}>
                        {roomTypeList[this.state.roomType_index].rooms.length
                            ? roomTypeList[this.state.roomType_index].rooms.map((rooms, k) => {
                                return <div key={rooms._id} className="col-xs-12 col-sm-6 mb-20" onClick={(e) => this.handleChange('room_id', rooms._id, k, 3, e)}>
                                    <div className="cardBlock">{rooms.no}
                                        <div ref={"block" + k} className={"custom-image bg-img bg-img" + k % 4} />
                                        <span ref={"ripple" + k} className={classNames("ripple", { show: this.state.active_index === k })}></span>
                                    </div>
                                </div>
                            }) : <div className="col-xs-12"><p>尚未新增任何房間</p></div>}
                    </div>
                    : null}

                {this.state.step === 3
                    ? <div className="row">
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"><i className="fa fa-cloud"></i> 煙霧感應器
                                    <div className={"custom-image bg-img bg-img1 disabled"} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"> <i className="fa fa-thermometer-full"></i> 溫度感應器
                                    <div className={"custom-image bg-img bg-img2 disabled"} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"><i className="fa fa-lightbulb-o"></i> 亮度感應器
                                    <div className={"custom-image bg-img bg-img0 disabled"} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"><i className="fa fa-microchip"></i> 門窗感應器
                                    <div className={"custom-image bg-img bg-img3 disabled"} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"><i className="fa fa-microchip"></i> 移動感應器
                                    <div className={"custom-image bg-img bg-img3 disabled"} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-20">
                            <div className="cardBlock"><i className="fa fa-lightbulb-o"></i> 電燈
                                <div className={"custom-image bg-img bg-img3 disabled"} />
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default CardTree;