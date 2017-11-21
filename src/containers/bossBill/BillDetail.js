import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import Config from '../../config';
import  Nav from '../../containers/bossBill/Nav';
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();

Config.serverUrl = Config.serverUrl + "/";
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
        let tech = [];
        tech.push( billData.tech);
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">单据详情</div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">1、基本信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        <div className="col-md-4"><span className="b-edit-tit">合同编号：</span>  {billData.basic.contract_code} </div>
                        <div className="col-md-4"><span className="b-edit-tit">SKU编码：</span>  {billData.basic.sku_code} </div>
                        <div className="col-md-4"><span className="b-edit-tit">数量：</span>  {billData.basic.num} </div>
                        <div className="col-md-4"><span className="b-edit-tit">单价：</span>  {billData.basic.price} </div>
                        <div className="col-md-4"><span className="b-edit-tit">下单时间：</span>  {billData.basic.order_ts} </div>
                        <div className="col-md-4"><span className="b-edit-tit">下单类型：</span>  {billData.basic.order_type==1?"首单":"翻单"} </div>
                        <div className="col-md-4"><span className="b-edit-tit">交付时间：</span> {Util.formatDate(billData.basic.deliver_ts,"YYYY-MM-DD")}  </div>
                        <div className="col-md-4"><span className="b-edit-tit">付款时间：</span> {Util.formatDate(billData.basic.pay_ts,"YYYY-MM-DD")} </div>
                        <div className="col-md-4"><span className="b-edit-tit">客户：</span>  {billData.basic.client ? billData.basic.client.name:""} </div>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">尺码信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.sizes.map((m,n)=>{
                            return (
                                <div className="col-md-2" key={"size-"+n}><span className="b-edit-tit">{m.sizeName}：</span>  {m.num} </div>
                            )
                        })}

                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">2、图片信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.imgs.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <img src={Config.serverUrl+m.url} className="b-upload-pic"/>
                                    <p className="mt20"><span className="b-edit-tit">名称：</span>{m.name}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">3、采购单，录入布料采购及布款支付记录</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.colths.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <img src={Config.serverUrl+m.url} className="b-upload-pic"/>
                                    <p className="mt20"><span className="b-edit-tit">金额：</span>{m.money}</p>
                                    <p className="mt5"><span className="b-edit-tit">日期：</span>{Util.formatDate(m.payTS,"YYYY-MM-DD")}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">4、拍照上传采购单，录入辅料采购及辅料款支付记录</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.submaterials.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <img src={Config.serverUrl+m.url} className="b-upload-pic"/>
                                    <p className="mt20"><span className="b-edit-tit">金额：</span>{m.money}</p>
                                    <p className="mt5"><span className="b-edit-tit">日期：</span>{Util.formatDate(m.payTS,"YYYY-MM-DD")}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">5、裁剪、加工及工艺信息</h3>
                    {tech.length > 0 ?(
                        <div className="row b-edit" style={{"lineHeight":"30px"}}>
                            <div className="col-md-3" key={"size"}>
                                <img src={Config.serverUrl+ billData.tech.url} className="b-upload-pic"/>
                                <p className="mt20"><span className="b-edit-tit">数量：</span>{billData.tech.num}</p>
                                <p className="mt5"><span className="b-edit-tit">日期：</span>{Util.formatDate(billData.tech.finish_ts,"YYYY-MM-DD")}</p>
                            </div>

                        </div>
                    )　:""}
                    <h3 className="b-title mt20" >本厂加工</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        <div className="col-md-3" key={"size-xs"}>
                            <p className="mt20"><span className="b-edit-tit">金额：</span>{billData.selfwork.money}</p>
                            <p className="mt5"><span className="b-edit-tit">数量：</span>{billData.selfwork.num}</p>
                        </div>
                    </div>
                    <h3 className="b-title mt20">外发加工</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.outfactoryworks.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <p className="mt20"><span className="b-edit-tit">数量：</span>{m.num}</p>
                                    <p className="mt5"><span className="b-edit-tit">金额：</span>{m.money}</p>
                                </div>
                            )
                        })}
                    </div>
                    <h3 className="b-title mt20">外发工艺</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.outfactorytechs.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <p className="mt20"><span className="b-edit-tit">数量：</span>{m.num}</p>
                                    <p className="mt5"><span className="b-edit-tit">金额：</span>{m.money}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className="stdreimburse-box">
                    <h3 className="b-title">6、收货单，录入出货信息</h3>
                    <div className="row b-edit" style={{"lineHeight":"30px"}}>
                        {billData.delivers.map((m,n)=>{
                            return (
                                <div className="col-md-3" key={"size-"+n}>
                                    <img src={Config.serverUrl+m.url} className="b-upload-pic"/>
                                    <p className="mt20"><span className="b-edit-tit">数量：</span>{m.num}</p>
                                    <p className="mt5"><span className="b-edit-tit">日期：</span>{Util.formatDate(m.out_ts,"YYYY-MM-DD")}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        )
    }
}