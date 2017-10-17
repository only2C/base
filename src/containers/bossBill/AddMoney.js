import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {MonthPicker} from 'ssc-grid';
import ReactEcharts from 'echarts-for-react';
import Util from '../../common/utils';
import {Button,Modal,DropdownButton,MenuItem} from 'react-bootstrap';
import Nav from '../../containers/bossBill/Nav';

// 新增收款
@observer
export default class AddMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            timeValue:"", // 时间

        }
    }
    render(){
        let initTime = new Date().getFullYear() + "-" + new Date().getMonth();
        return(
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">新增收款</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">查询条件</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="fl b-monthPicker">
                                <MonthPicker value={this.state.timeValue?this.state.timeValue:initTime} onChange={this.handleTimeChange}/>
                            </div>
                            <DropdownButton className= "mr30" bsStyle="default" title="全部顾客" key="1" >
                                <MenuItem eventKey="1">张三</MenuItem>
                                <MenuItem eventKey="2">李四</MenuItem>
                                <MenuItem eventKey="2">王五</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <div className="row">
                        <div className="col-md-5">
                            <ReactEcharts
                                option={this.getOption()}
                                style={{height: '300px', width: '100%'}}
                                className='echarts-for-echarts'
                                theme='my_theme' />
                        </div>
                        <div className="col-md-2 b-add-total">
                            <span>已收款：12345.45 元</span>
                            <span className="red">欠收款：12345.45 元</span>
                            <span className="blue">预收款：12345.45 元</span>
                        </div>
                    </div>



                    <h3 className="b-add-h3">15日 星期五 收入1000</h3>
                    <div className="row b-add-body" style={{"line-height":"35px"}}>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                    </div>
                    <h3 className="b-add-h3">15日 星期五 收入1000</h3>
                    <div className="row b-add-body" style={{"line-height":"35px"}}>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                        <div className="col-md-3">铭迈  2223</div>
                    </div>
                </div>

                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    handleTimeChange = (value, formattedValue)=>{
        this.setState({
            timeValue:formattedValue
        })
    }


    getOption =()=>{
        let option = {
            title : {
                text: '收款一览表',
                subtext: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['欠收款','已收款','预收款']
            },
            series : [
                {
                    name: '状态预览',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:310, name:'欠收款'},
                        {value:335, name:'已收款'},
                        {value:234, name:'预收款'},

                    ],
                    color:['red','blue','#cfcfcf'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }
    //取消
    exit = ()=>{
        window.location.hash= '#/bossBill'
    }
}