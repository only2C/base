import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker2} from 'ssc-grid';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '../../config';
import globalStore from '../../stores/GlobalStore';

// 订单信息模块
export default class BillEditOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeModalShow:false,
            sizeName:'',
            sizeNumber:'',
            sizeTotal:0
        }
    }

    componentWillMount (){
        this.getSizeTotal();
    }


    componentWillReceiveProps(props){
        this.getSizeTotal();
    }


    render(){
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">1、输入订单信息</h3>
                <div className="row b-edit">
                    <div className="col-md-4">合同编号：<input type="text" placeholder="合同编号"/></div>
                    <div className="col-md-4">SKU编号：<input type="text" placeholder="sku编号"/></div>
                    <div className="col-md-4">接单单价：<input type="text" placeholder="接单单价"/></div>
                    <div className="col-md-4">下单件数：<input type="text"  value="123" disabled="true"/></div>
                    <div className="col-md-4">下单时间：<DatePicker2 id="example-datepicker"
                                                                dateFormat="YYYY-MM-DD" value="" onChange=""/></div>
                    <div className="col-md-4">下单类型：<select><option>1562</option> </select></div>
                    <div className="col-md-4">客户：<select><option>客户A</option> </select></div>
                    <div className="col-md-4">客户付款时间：<DatePicker2 id="example-datepicker"
                                                                  dateFormat="YYYY-MM-DD" value="" onChange=""/></div>
                    <div className="col-md-4">计划交货时间：<DatePicker2 id="example-datepicker"
                                                                  dateFormat="YYYY-MM-DD" value="" onChange=""/></div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>

                <div className="row">
                    <h3 className="b-title">各尺码件数：共{this.state.sizeTotal}件<Button className="ml50" onClick={this.addSizeModal}>新增码数</Button></h3>
                    <div className="b-size">
                        {this.props.sizeList.map((m,n)=>{
                            return (
                                <div className="col-md-2" key={"size"+n}>
                                    <p>{m.name}</p>
                                    <input type="text" value={m.number} className="b-input" style={{"width":"100px"}} />
                                </div>
                            )
                        })}

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
        let sizeList = this.props.sizeList ;
        sizeList.push({name:this.state.sizeName,number:this.state.sizeNumber})
        this.props.setStateData(sizeList);
        this.setState({
            sizeModalShow:false
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
    // 关闭窗口事件
    closeModal = ()=>{
        this.setState({
            sizeModalShow:false
        })
    }

    getSizeTotal = ()=>{
        let sizeTotal = 0 ;
        this.props.sizeList.map((m)=>{
            sizeTotal += parseFloat(m.number);
        })
        this.setState({sizeTotal})
    }


}