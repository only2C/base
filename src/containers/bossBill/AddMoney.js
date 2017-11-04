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
            timeValue: new Date().getFullYear() + "-" + new Date().getMonth(), // 时间
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

        store.queryClientList({"factory_id":this.props.router.params.factoryId},()=>{
            this.setState({
                clientList:store.queryClientListData
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
                    <h3 className="b-title">查询条件</h3>
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
                        <Button onClick={this.searchEvent}>搜索</Button>
                        <div className="fr">
                            <Button bsStyle="warning" onClick={this.showModal.bind(this,0)}>新增收款</Button>
                            <Button className="ml30" onClick={this.showModal.bind(this,1)}>新增收款客户</Button>
                        </div>
                    </div>
                </div>
                <div className="stdreimburse-box">
            {/*        <div className="row">
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
                    </div>*/}

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
                                <div className="col-md-4">
                                    <span className="b-add-body-tit">已收款：</span>
                                    <span>{m.summarizes.hascome}</span>
                                </div>
                                <div className="col-md-4 red">
                                    <span className="b-add-body-tit">欠收款：</span>
                                    <span>{m.summarizes.nohascome}</span>
                                </div>
                                <div className="col-md-4 blue">
                                    <span className="b-add-body-tit">逾期款：</span>
                                    <span>{m.summarizes.expirecome}</span>
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
                        <Button onClick={this.closeModal.bind(this,1)}>取消</Button>
                        <Button bsStyle="warning" onClick={this.saveModalMoney}>确定</Button>
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
                        <Button bsStyle="warning" onClick={this.saveModalClient}>确定</Button>
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
        addMoney["client"] = {"id":el.val(),"name":el.text()}
        this.setState({
            addMoney
        })
    }

    saveModalMoney = ()=>{
        let addMoney = this.state.addMoney;
        let clientList = this.state.clientList ;
        let param ={
            client:addMoney["client"] ||clientList[0],
            money:addMoney["money"]||0,
            create_ts: new Date().getFullYear() + "-" + ( new Date().getMonth()+1)
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
        let client=this.state.client ;
        client["name"] = e.target.value ;
        this.setState({
            client
        })
    }
    saveModalClient = ()=>{
        let param ={
            "name":this.state.client["name"],
            "factory_id":this.props.router.params.factoryId
        }
        store.addIncomeClient(param,()=>{
            this.closeModal(1)
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
        window.location.hash= '#/bossBill/'+this.props.router.params.factoryId
    }
}