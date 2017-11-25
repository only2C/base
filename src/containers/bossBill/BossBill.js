import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem,Pagination} from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Nav from '../../containers/bossBill/Nav';
import BossBillTableBody from '../../components/bossBill/BossBillTableBody';
import Util from '../../common/utils';
import { MonthPicker } from 'ssc-grid'
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();
import localforage from 'localforage';
@observer
export default class BossBill extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ // headerList  ==>   type : 0  正常  -1 重点显示 （红色） 1 普通 蓝色
            searchKey:"",
            timeValue: new Date().getFullYear() + "-" + ( new Date().getMonth()+1), // 时间
            totalPage:0,
            activePage:0,
            clientList:[{"id":0,"name":"全部客户"}],
            client:"",
            factory:"",
            factoryId:""

        }
    }

    componentWillMount(){
        let that = this;
        localforage.getItem("loginInfo",function(err,value){
            that.setState({
                factoryId:value.factory.id
            })
        });

        this.initDate();
        this.initClient();

    }

    // 初始化日期
    initDate = ()=>{
        let initTime = this.state.timeValue ?this.state.timeValue: new Date().getFullYear() + "-" + ( new Date().getMonth()+1);
        this.setState({
            timeValue:initTime
        },()=>{
            this.initOrderList();
        })
    }

    // 初始化客户列表
    initClient =()=>{
        store.queryClientList({"factory_id":this.props.router.params.factoryId},()=>{
            let data = store.queryClientListData ;
            data.splice(0,0,{id:0,name:"全部客户"})
            this.setState({
                clientList:store.queryClientListData
            })
        });
    }


    //初始化数据
    initOrderList =()=>{
        let param ={
            "query_ts":this.state.timeValue,
            "client_id":this.state.client||0,
            "factory_id":this.props.router.params.factoryId,
            "query_cond":this.state.searchKey
        };
        store.queryOrderList(param,()=>{
            this.setState({

            })
        })
    }

    render(){
        let that = this;
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">老板利润表</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title"><span className="glyphicon glyphicon-stats mr5"></span> 查询条件</h3>
                    <div style={{"display":'inline-block'}}>
                        <div className="fl b-monthPicker">
                            <MonthPicker value={this.state.timeValue} onChange={this.handleTimeChange}/>
                        </div>
                        <select className="b-select mr20"  onChange={this.setSelect.bind(this,"client")}>
                            {that.state.clientList.map((m,n)=>{
                                return (
                                    <option key={ "client-"+n} value={m.id}>{m.name}</option>
                                )
                             })
                            }
                        </select>

                      {/*  <div className="input-group fr" style={{"width":"300px"}}>
                            <input type="text" className="form-control" value={this.state.searchKey} onChange={this.setInput.bind(this)}
                                   placeholder="请输入SKU编号、合同标号、客户" />
                            <span className="input-group-addon b-search" onClick={this.initOrderList}>搜索</span>
                        </div>*/}

                       <Button onClick={this.initOrderList} bsStyle="warning" className="glyphicon glyphicon-search" ><span className="fr" style={{"margin":"-2px 0 0 4px"}}>搜索</span></Button>

                    </div>
                    <div className="fr">
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,0)} className="mr15">新增订单</Button>
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,1)} className="mr15">新增收款</Button>
                        <Button bsStyle="warning" onClick={this.setRouter.bind(this,2)} className="mr15">计件工资</Button>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title"><span className="glyphicon glyphicon-th-list mr5"></span>详细参数</h3>
                    <div className="row b-header">
                        {store.orderListGather.map((m,n)=>{
                            let cssStyle = "";
                            if(m.type == 1){
                                cssStyle = "red";
                            }else if(m.type == 2){
                                cssStyle = "blue";
                            }
                            return (
                                <div className={ "col-md-4 " +cssStyle}  key={"headerList"+n}>
                                    <b>{m.name}：</b> {Util.formatCurrency(m.value)}
                                </div>
                            )
                        })}

                    </div>
                </div>

                <BossBillTableBody tableData={store.orderListOrders}/>

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
        let factoryId = this.state.factoryId ;
        store.orderAdd({"factory_id":factoryId},(pk)=>{
            window.location.hash= '#/'+router + '/'+ pk + '/'+ factoryId
        });

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

    setSelect = (param,e) =>{
        let el = $(e.currentTarget).find("option:selected");
        if(param == "client"){
            let client = el.val()
            this.setState({
                client
            })
        }else{
            let factory =el.val();
            this.setState({
                factory
            })
        }
    }

}