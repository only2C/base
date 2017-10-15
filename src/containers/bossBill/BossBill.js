import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem} from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Nav from '../../containers/bossBill/Nav';
import BossBillTableBody from '../../components/bossBill/BossBillTableBody';
import Util from '../../common/utils';
import { MonthPicker } from 'ssc-grid'
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();
@observer
export default class BossBill extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ // headerList  ==>   type : 0  正常  -1 重点显示 （红色） 1 普通 蓝色
            searchKey:"",
            timeValue:"", // 时间

        }
    }

    componentWillMount(){
        this.initOrderList();
    }

    //初始化数据
    initOrderList =()=>{
        let param ={};
        store.queryOrderList(param,()=>{
        })
    }

    render(){
        let initTime = new Date().getFullYear() + "-" + new Date().getMonth();
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">老板利润表</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">查询条件</h3>
                    <div style={{"display":'inline-block'}}>
                        <div className="fl b-monthPicker">
                            <MonthPicker value={this.state.timeValue?this.state.timeValue:initTime} onChange={this.handleTimeChange}/>
                        </div>
                        <DropdownButton className= "mr30" bsStyle="default" title="全部顾客" key="1" >
                            <MenuItem eventKey="1">张三</MenuItem>
                            <MenuItem eventKey="2">李四</MenuItem>
                            <MenuItem eventKey="2">王五</MenuItem>
                        </DropdownButton>

                        <div className="input-group fr" style={{"width":"300px"}}>
                            <input type="text" className="form-control" value={this.state.searchKey} onChange={this.setInput.bind(this)}
                                   placeholder="请输入SUK编号、合同标号、客户" />
                            <span className="input-group-addon" onClick={this.searchData}>搜索</span>
                        </div>
                    </div>
                    <div className="fr">
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,0)} className="mr15">新增订单</Button>
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,1)} className="mr15">新增收款</Button>
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,2)} className="mr15">计件工资</Button>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">详细参数</h3>
                    <div className="row b-header">
                        {store.orderListGather.map((m,n)=>{
                            let cssStyle = "";
                            if(m.type == 2){
                                cssStyle = "red";
                            }else if(m.type == 3){
                                cssStyle = "blue";
                            }
                            return (
                                <div className={ "col-md-4 " +cssStyle}  key={"headerList"+n}>
                                    <b>{m.name}：</b> {Util.formatCurrency(m.number)}
                                </div>
                            )
                        })}

                    </div>
                </div>

                <BossBillTableBody tableData={store.orderListOrders} pageData={store.orderListPage}/>

            </div>
        )
    }

    setRouter = (param)=>{
        let router = "";
        if(param==0){
            router = 'billEdit';
        }else if(param ==1 ){
            router = 'addMoney'
        }else{
            router ='salary'
        }
        window.location.hash= '#/'+router;
    }

    setInput =(e)=>{
        this.setState({
            searchKey:e.target.value
        })
    }

    handleTimeChange = (value, formattedValue)=>{
        this.setState({
            timeValue:formattedValue
        })
    }

    // 搜索数据
    searchData =()=>{
        //do search event

    }

}