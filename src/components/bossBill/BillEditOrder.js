import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker2} from 'ssc-grid';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '../../config';
import globalStore from '../../stores/GlobalStore';
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();
// 订单信息模块
export default class BillEditOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeModalShow:false,
            sizeName:'',
            sizeNumber:'',
            sizeTotal:0,
            order:{},
            sizeList:[]
        }
    }

    componentWillMount (){
        this.getSizeTotal();
    }


    componentWillReceiveProps(props){
        this.getSizeTotal();
    }

    setOrder = (param,e)=> {
        let order = this.state.order ;
        order[param] = e.target.value ;
        this.setState({
            order
        })

    }
    setTime =(param,value, formattedValue )=>{
        let order = this.state.order;
        order[param] = formattedValue ;
        this.setState({
            order
        })
    }
    setSelect =(param,e)=>{
        let el = $(e.currentTarget).find("option:selected");
        let client ={"name":el.text() , "id":el.val() };
        let order = this.state.order ;
        order[param] = client;
        this.setState({
            order
        })
    }
    render(){
        let order = this.state.order ;
        let that = this;
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">1、输入订单信息</h3>
                <div className="row b-edit">
                    <div className="col-md-4"><span className="b-edit-tit">合同编号：</span> <input type="text" onChange={this.setOrder.bind(this,"contract_code")} value={order['contract_code']} placeholder="合同编号"/></div>
                    <div className="col-md-4"><span className="b-edit-tit">SKU编号：</span><input type="text" onChange={this.setOrder.bind(this,"SKU_code")} value={order['SKU_code']} placeholder="sku编号"/></div>
                    <div className="col-md-4"><span className="b-edit-tit">接单单价：</span><input type="text" placeholder="接单单价" onChange={this.setOrder.bind(this,"number")} value={order['number']}/></div>
                    <div className="col-md-4"><span className="b-edit-tit">下单件数：</span><input type="text" disabled="true" onChange={this.setOrder.bind(this,"price")} value={order['price']}/></div>
                    <div className="col-md-4">
                        <span className="b-edit-tit">下单时间：</span>
                        <DatePicker2 id="example-datepicker-1" dateFormat="YYYY-MM-DD" value={order['order_ts']} onChange={this.setTime.bind(this,"order_ts")}/>
                    </div>
                    <div className="col-md-4">
                        <span className="b-edit-tit">下单类型：</span>
                        <select className="b-select" onChange={that.setSelect.bind(this,"order_type")}>
                            <option value="1">1562</option>
                            <option value="2">1565</option>
                            <option value="3">1567</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <span className="b-edit-tit" >客户：</span>
                        <select className="b-select" onChange={that.setSelect.bind(this,"client")}>
                            <option value="1">客户A</option>
                            <option value="2">5</option>
                            <option value="3">666</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <span className="b-edit-tit">付款时间：</span>

                        <DatePicker2 id="example-datepicker-3" dateFormat="YYYY-MM-DD" value={order['pay_ts']} onChange={this.setTime.bind(this,"pay_ts")}/>
                    </div>
                    <div className="col-md-4">
                        <span className="b-edit-tit">交货时间：</span>
                        <DatePicker2 id="example-datepicker-2" dateFormat="YYYY-MM-DD" value={order['deliver_ts']} onChange={this.setTime.bind(this,"deliver_ts")}/>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning" onClick={this.saveOrder}>保存</Button>
                </div>

                <div className="row b-border-line">
                    <h3 className="b-title">各尺码件数：共{this.state.sizeTotal}件<Button className="ml50" onClick={this.addSizeModal}>新增码数</Button></h3>
                    <div className="b-size">
                        {this.state.sizeList.map((m,n)=>{
                            return (
                                <div className="col-md-2" key={"size"+n}>
                                    <p>{m.name}</p>
                                    <input type="text" value={m.num||0} className="b-input" onChange={this.setSize.bind(this,m.size)} style={{"width":"100px"}} />
                                </div>
                            )
                        })}

                    </div>
                    <div className="row b-center">
                        <Button bsStyle="warning" onClick={this.saveOrderSize}>保存</Button>
                    </div>


                    <Modal show={this.state.sizeModalShow} onHide={this.closeModal.bind(this,"size")} className="static-modal">
                        <Modal.Header closeButton={true}>
                            <Modal.Title >新增码数</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{overflow:'auto'}}>
                            <div className="row">
                                <div className="col-md-3">码数：<input type="text" className="b-input" value={this.state.sizeName} onChange={this.setInput.bind(this,0)}/></div>
                                <div className="col-md-3">数量：<input type="text" className="b-input" value={this.state.sizeNumber} onChange={this.setInput.bind(this,1)}/></div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this)}>取消</Button>
                            <Button onClick={this.saveSizeModal} bsStyle="primary">确定</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }

    //新增码数
    addSizeModal = () =>{
        this.setState({
            sizeName:'',
            sizeNumber:'',
            sizeModalShow:true
        })
    }

    saveSizeModal =() =>{
        let sizeList = this.state.sizeList ;
        sizeList.push({size:this.state.sizeName,num:this.state.sizeNumber})
        // this.props.setStateData(sizeList);
        this.setState({
            sizeModalShow:false,
            sizeList
        })
    }

    setInput = (value , e )=>{
        let val = e.target.value ;
        if(value == 0){
            this.setState({sizeName:val})
        }else {
            this.setState({sizeNumber:val})
        }

    }

    setSize = (id , e )=>{
        let sizeList = this.state.sizeList;
        sizeList.forEach((m)=>{
            if(m.id = id )
                m.number = parseInt(e.target.value) || 0
        })
        this.setState({
            sizeList
        })
    }

    // 关闭窗口事件
    closeModal = ()=>{
        this.setState({
            sizeModalShow:false
        })
    }

    getSizeTotal = ()=>{
        let sizeTotal = 0 ;
        store.getSizeBase(()=>{
            this.setState({
                sizeList:store.getSizeBaseData
            })
        })

        this.state.sizeList.map((m)=>{
            m.number = m.number || 0 ;
            sizeTotal += parseFloat(m.number);
        })
        this.setState({
            sizeTotal
        })
       //  this.setState({sizeTotal})
    }

    saveOrder = () =>{
        let order = this.state.order ;
        // TODO 必输校验没有处理 2017年10月28日22:59:34
        let param ={
            "order_id":this.props.orderId,
            "contract_code":order["contract_code"],
            "sku_code":order['SKU_code'],
            "num":order['number'],
            "price":order['price'],
            "type":order['order_type'].id || 0,
            "deliver_ts":order['deliver_ts'],
            "pay_ts":order['pay_ts'],
            "client":order['client'],
        }

        store.orderSave(param,()=>{

        })

    }

    saveOrderSize =()=>{
        let param={
            order_id:this.props.orderId,
            sizes:this.state.sizeList
        }
        store.saveSizes(param,()=>{

        })
    }


}