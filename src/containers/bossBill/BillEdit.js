import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  BillEditOrder  from '../../components/bossBill/BillEditOrder' ;
import  Nav from '../../containers/bossBill/Nav';
import  BillEditUploadModule2  from '../../components/bossBill/BillEditUploadModule2' ;
import  BillEditUploadModule3  from '../../components/bossBill/BillEditUploadModule3' ;
import  BillEditUploadModule4  from '../../components/bossBill/BillEditUploadModule4' ;
import  BillEditUploadModule5  from '../../components/bossBill/BillEditUploadModule5' ;
import  BillEditUploadModule6  from '../../components/bossBill/BillEditUploadModule6' ;
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();
// 编辑和新增
@observer
export default class BillEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            baseData:"",
            sizeData:"",
            imgData:"",
            clothData:"",
            submaterialData:"",
            techData:"",
            selfworksData:"",
            outworkData:"",
            outtechData:"",
            deliverData:""
        }
    }

    componentWillMount(){
        this.isEdit();
    }

    //是否是编辑状态  0 为编辑  不存在或不传入值为新增
    isEdit =()=>{
        if(this.props.router.params.add == 0){
            this.getDetail();
        }
    }
    getDetail=()=>{
        store.queryBillDetail({'order_id':this.props.router.params.pk},(billData)=>{
            this.setState({
                baseData:billData.basic,
                sizeData:billData.sizes,
                imgData:billData.imgs,
                clothData:billData.colths,
                submaterialData:billData.submaterials,
                techData: billData.tech,
                selfworksData:billData.selfwork,
                outworkData:billData.outfactoryworks,
                outtechData:billData.outfactorytechs,
                deliverData:billData.delivers
            })
        })
    }

    setStateData = (data, callback) => {
        this.setState(data, ()=> {
            if (typeof callback == 'function')
                callback();
        })
    }
    render(){
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">{this.props.router.params.add == 0  ?"编辑":"新增"}订单</div>
                {/*1、订单信息**/}
                <BillEditOrder setStateData = {this.setStateData} orderId={this.props.router.params.pk}
                               factoryId={this.props.router.params.factoryId} baseData={this.state.baseData} sizeData={this.state.sizeData}/>
                {/*2、拍照上传款式图片，合同照片等**/}
                <BillEditUploadModule2 orderId={this.props.router.params.pk} imgData={this.state.imgData}/>
                {/*3、拍照上传采购单，录入布料采购及布款支付记录**/}
                <BillEditUploadModule3 orderId={this.props.router.params.pk} clothData={this.state.clothData}/>
                {/*4、拍照上传采购单，录入辅料采购及辅料款支付记录**/}
                <BillEditUploadModule4 orderId={this.props.router.params.pk} factoryId={this.props.router.params.factoryId} submaterialData={this.state.submaterialData}/>
                {/*5、录入裁剪、加工及工艺信息**/}
                <BillEditUploadModule5 orderId={this.props.router.params.pk} factoryId={this.props.router.params.factoryId}
                                       techData={this.state.techData} selfworksData={this.state.selfworksData} outworkData={this.state.outworkData} outtechData={this.state.outtechData}/>
                {/*6、拍照上传收货单，录入出货信息**/}
                <BillEditUploadModule6 orderId={this.props.router.params.pk} factoryId={this.props.router.params.factoryId} deliverData={this.state.deliverData}/>
                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //确定
    submit = ()=>{

    }

    //取消
    exit = ()=>{
        window.location.hash= '#/bossBill/'+this.props.router.params.factoryId
    }
}
