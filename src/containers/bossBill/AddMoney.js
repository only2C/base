import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {MonthPicker} from 'ssc-grid';
import ReactEcharts from 'echarts-for-react';
import Util from '../../common/utils';
import {Button,Modal,DropdownButton,MenuItem} from 'react-bootstrap';
import Nav from '../../containers/bossBill/Nav';
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();
// 新增收款
@observer
export default class AddMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            timeValue: new Date().getFullYear() + "-" + ( new Date().getMonth()+1), // 时间
            clientList:[],
            client:"",
            searchResult:[],
            addMoney:{},
            addMoneyShow:false,
            addClient:{},
            addClientShow:false

        }
    }
    componentWillMount (){
        this.getClient();
    }

    getClient = ()=>{
        store.queryIncomeClient({"factory_id":this.props.router.params.factoryId},(data)=>{
            this.setState({
                clientList:data
            },()=>{
                this.searchEvent();
            })
        });
    }
    render(){
        return(
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">新增收款</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title"><span className="glyphicon glyphicon-stats mr5"></span>查询条件</h3>
                    <div className="row">
                        <div className="fl b-monthPicker">
                            <MonthPicker value={this.state.timeValue} onChange={this.handleTimeChange}/>
                        </div>
                        <select className="b-select mr20"  onChange={this.setSelect}>
                            {this.state.clientList.map((m,n)=>{
                                return (
                                    <option key={ "client-"+n} value={m.id}>{m.name}</option>
                                )
                            })
                            }
                        </select>
                        <Button onClick={this.searchEvent} bsStyle="warning" className="glyphicon glyphicon-search" ><span className="fr" style={{"margin":"-2px 0 0 4px"}}>搜索</span></Button>
                        <div className="fr">
                            <Button bsStyle="warning" onClick={this.showModal.bind(this,0)}>新增收款</Button>
                            <Button bsStyle="warning" className="ml30" onClick={this.showModal.bind(this,1)}>新增收款客户</Button>
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
                            <span>已收款：{store.setSummarizes.hascome}</span>
                            <span className="red">欠收款：{store.setSummarizes.nohascome}元</span>
                            <span className="blue">预收款：{store.setSummarizes.expirecome}元</span>
                        </div>
                    </div>

                    {this.state.searchResult.map((m,n)=>{
                        return(
                         <div key={"search"+n}>
                            <div className="row b-add-body" style={{"line-height":"35px"}}>
                                <div className="col-md-4">
                                    <span className="b-add-body-tit">付款方：</span>
                                    <span>{m.client.name}</span>
                                </div>
                                <div className="col-md-4">
                                    <span className="b-add-body-tit">付款金额：</span>
                                    <span>{m.money}</span>
                                </div>
                                <div className="col-md-4">
                                    <span className="b-add-body-tit">付款时间：</span>
                                    <span>{m.income_ts}</span>
                                </div>

                            </div>

                        </div>)
                    })}



                </div>

                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
                        </div>
                    </div>
                </div>


                <Modal show={this.state.addMoneyShow} onHide={this.closeModal.bind(this,0)}>
                    <Modal.Header closeButton>
                        <Modal.Title>新增收款</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row ml150 mt10">
                            <span className="w100 fl">付款方：</span>
                            <select className="b-select"  onChange={this.setClient}>
                                {this.state.clientList.map((m,n)=>{
                                    return (
                                        <option key={"factory"+n} value={m.id}>{m.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="row ml150 mt10">
                            <span className="w100 fl">金额：</span><input type="text" className=" b-input" value={this.state.addMoney["money"]} onChange={this.setMoney} placeholder="请输入收款金额"/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this,0)}>取消</Button>
                        <Button bsStyle="success" onClick={this.saveModalMoney}>确定</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.addClientShow} onHide={this.closeModal.bind(this,1)}>
                    <Modal.Header closeButton>
                        <Modal.Title>新增付款</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row ml150 mt10">
                            <span className="w100 fl">收款方：</span><input type="text" className=" b-input" value={this.state.addClient["name"]} onChange={this.setClientName} placeholder="请输入收款方"/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this,1)}>取消</Button>
                        <Button bsStyle="success" onClick={this.saveModalClient}>确定</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )

    }
    handleTimeChange = (value, formattedValue)=>{
        this.setState({
            timeValue:formattedValue
        })
    }
    setSelect = (e)=>{
        let el = $(e.currentTarget).find("option:selected");
        this.setState({
            client:el.val()
        })
    }

    searchEvent =()=>{
        let param = {
            "query_ts":this.state.timeValue,
            "factory_id":this.props.router.params.factoryId,
            "client_id":this.state.client ? this.state.client : this.state.clientList[0].id
        }
        store.queryIncome(param,(data)=>{
            this.setState({
                searchResult:data
            })
        })
    }
    /*新增收款 */
    setMoney=(e)=>{
        let addMoney = this.state.addMoney;
        addMoney["money"] = e.target.value ;
        this.setState({
            addMoney
        })
    }
    setClient = (e)=>{
        let addMoney = this.state.addMoney;
        let el = $(e.currentTarget).find("option:selected");
        addMoney["client"] = el.val() ;
        this.setState({
            addMoney
        })
    }

    getNowFormatDate = () => {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    saveModalMoney = ()=>{
        let addMoney = this.state.addMoney;
        let clientList = this.state.clientList ;
        let param ={
            client_id:addMoney["client"]||clientList[0].id,
            money:addMoney["money"]||0,
            factory_id:this.props.router.params.factoryId,
            create_ts: this.getNowFormatDate()
        }

        store.addIncome(param,()=>{
            this.closeModal(0);
            // clientList.push(param.client);
            // this.setState({
            //     clientList
            // })
        })

    }
    /*新增收款 end */

    /*新增客户（收款方）*/
    setClientName= (e)=>{
        let addClient=this.state.addClient ;
        addClient["name"] = e.target.value ;
        this.setState({
            addClient
        })
    }
    saveModalClient = ()=>{
        let param ={
            "name":this.state.addClient["name"],
            "factory_id":this.props.router.params.factoryId
        }
        store.addIncomeClient(param,()=>{
            this.closeModal(1);
            this.getClient();
        })
    }

    /*新增客户（收款方） end*/

    showModal = (param) =>{
        if(param == 0){
            this.setState({
                addMoneyShow:true
            })
        }else{
            this.setState({
                addClientShow:true
            })
        }
    }

    closeModal = (param) =>{
        if(param == 0){
            this.setState({
                addMoneyShow:false
            })
        }else{
            this.setState({
                addClientShow:false
            })
        }
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
                        {value:store.setSummarizes.nohascome, name:'欠收款'},
                        {value:store.setSummarizes.hascome, name:'已收款'},
                        {value:store.setSummarizes.expirecome, name:'预收款'},

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
        window.location.hash= '#/bossBill/'+this.props.router.params.factoryId
    }
}