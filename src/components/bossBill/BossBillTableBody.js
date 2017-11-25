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
                <h3 className="b-title"><span className="glyphicon glyphicon-th-list mr5"></span>详细信息</h3>
                {this.props.tableData.map((m,n)=>{
                    return(
                        <div className="row mt30 b-body" key={"n"+n}>
                            <div style={{"width":"2%"}} className="fl"><span className="b-body-spanIcon">{n+1}</span></div>
                            <div className="col-md-10 b-body-list">
                                <div className="col-md-3">sku编码：{m.sku_code}</div>
                                <div className="col-md-3">客户：{typeof m.client == "object" ? m.client.name:""}</div>
                                <div className="col-md-3">单价：{m.price}</div>
                                <div className="col-md-3">数量：{m.num}</div>
                                <div className="col-md-3">发货数量：{m.deliver_num}</div>
                                {/*<div className={( m.num_diff.type==1 ? "red":(m.num_diff.type==2 ?"blue":"") ) +" col-md-3"}>
                                    件数差：{m.num_diff.value}
                                    {m.num_diff.type==1 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.num_diff.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>
                                <div className={( m.colth_money.type==1 ? "red":(m.colth_money.type==2 ?"blue":"") ) +" col-md-3"}>
                                    布料款：{m.colth_money.value}
                                    {m.colth_money.type==1 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.colth_money.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>
                                <div className={ ( m.submaterial_money.type==1 ? "red":(m.submaterial_money.type==2 ?"blue":"") )  +" col-md-3"}>
                                     辅料：{m.submaterial_money.value}
                                    {m.submaterial_money.type==1 ? (<span className="ml10 glyphicon glyphicon-arrow-up"></span>):
                                        (m.submaterial_money.type==2 ? (<span className="ml10 glyphicon glyphicon-arrow-down"></span>):"")
                                    }
                                </div>*/}

                            </div>
                            <div className="col-md-1">
                                <a className="glyphicon glyphicon-pencil mr15 mt20" title="编辑" href="javascript:;" onClick={that.editBill.bind(this,m.id)}></a>
                                {/* <a className="glyphicon glyphicon-trash mt20" title="删除" href="javascript:;" onClick={that.deleteBill.bind(this)}></a>*/}
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
    editBill = (id)=>{
        window.location.hash ="/billDetail/"+id
    }

    //删除数据
    deleteBill =(e)=>{

        globalStore.showTipsModal("是否删除","small",()=>{

        })
    }
}