import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker} from 'ssc-grid';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '../../config';
import globalStore from '../../stores/GlobalStore';

export default class BossBillTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(props){

    }

    render(){
        let that = this ;
        return(
            <div className="stdreimburse-box">
                <h3 className="b-title">详细信息</h3>
                {this.props.tableData.map((m,n)=>{
                    return(
                        <div className="row mt30 b-body" key={"n"+n}>
                            <div className="col-md-10 b-body-list">
                                <div className="col-md-3">SKU号：{m.SKU}</div>
                                <div className="col-md-3">客户：{m.clientName}</div>
                                <div className="col-md-3">接件单数：{m.order_num}</div>
                                <div className="col-md-3">出货数：{m.out_num}</div>
                                <div className="col-md-3">接件价格：{m.order_price}</div>
                                <div className={m.order_diffnum.type==2 ? "red":(m.order_diffnum.type==3 ?"blue":"")  +"col-md-3"}>
                                    件数差：{m.order_diffnum.number}
                                    {m.order_diffnum.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.order_diffnum.type==3 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>
                                <div className={m.order_maretialprice.type==2 ? "red":(m.order_maretialprice.type==3 ?"blue":"")  +"col-md-3"}>
                                    单件布款：{m.order_maretialprice.number}
                                    {m.order_maretialprice.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.order_maretialprice.type==3 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>
                                <div className={m.order_submaterial.type==2 ? "red":(m.order_submaterial.type==3 ?"blue":"")  +"col-md-3"}>
                                    单件辅料：{m.order_submaterial.number}
                                    {m.order_submaterial.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.order_submaterial.type==3 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>

                            </div>
                            <div className="col-md-1">
                                <a className="glyphicon glyphicon-pencil mr15 mt20" title="编辑" href="javascript:;" onClick={that.editBill.bind(this)}></a>
                                <a className="glyphicon glyphicon-trash mt20" title="删除" href="javascript:;" onClick={that.deleteBill.bind(this)}></a>
                            </div>
                        </div>
                    )
                })}





            </div>
        )
    }

    handleSelect = ()=>{

    }
    // 编辑数据
    editBill = ()=>{

    }

    //删除数据
    deleteBill =(e)=>{

        globalStore.showTipsModal("是否删除","small",()=>{

        })
    }
}