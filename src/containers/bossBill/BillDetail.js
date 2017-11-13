import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();

// 查看单据详情
@observer
export default class BillDetail extends React.Component {

    constructor(props){
        super(props);
        this.state ={
        }
    }

    componentWillMount(){
        this.getDetail();
    }
    getDetail=()=>{
        store.queryBillDetail({'order_id':this.props.router.params.pk},()=>{
        })
    }

    render(){
        let billData = store.billDetail;
        if($.isEmptyObject(billData)){
            return (<div></div>)
        }
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">{billData.factory.name}单据详情</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">1、基本信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        <div className="col-md-4"><span className="b-edit-tit">合同编号：</span>  {billData.base.contract_code} </div>
                        <div className="col-md-4"><span className="b-edit-tit">SKU编码：</span>  {billData.base.sku_code} </div>
                        <div className="col-md-4"><span className="b-edit-tit">数量：</span>  {billData.base.num} </div>
                        <div className="col-md-4"><span className="b-edit-tit">单价：</span>  {billData.base.price} </div>
                        <div className="col-md-4"><span className="b-edit-tit">下单时间：</span>  {billData.base.order_ts} </div>
                        <div className="col-md-4"><span className="b-edit-tit">下单类型：</span>  {billData.base.order_type} </div>
                        <div className="col-md-4"><span className="b-edit-tit">交付时间：</span>  {billData.base.deliever_ts} </div>
                        <div className="col-md-4"><span className="b-edit-tit">付款时间：</span>  {billData.base.pay_ts} </div>
                        <div className="col-md-4"><span className="b-edit-tit">客户：</span>  {billData.base.client.name} </div>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">2、尺码信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.size.sizes.map((m,n)=>{
                            return (
                                <div className="col-md-2" key={"size-"+n}><span className="b-edit-tit">{m.name}：</span>  {m.num} </div>
                            )
                        })}

                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">3、图片信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.img.imgs.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <img src={m.url} className="b-upload-pic"/>
                                    <p className="mt20"><span className="b-edit-tit">名称：</span>{m.name}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}