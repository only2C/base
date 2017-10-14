import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  BillEditOrder  from '../../components/bossBill/BillEditOrder' ;
import  BillEditUploadModule2  from '../../components/bossBill/BillEditUploadModule2' ;
import  BillEditUploadModule3  from '../../components/bossBill/BillEditUploadModule3' ;
import  BillEditUploadModule4  from '../../components/bossBill/BillEditUploadModule4' ;

// 编辑和新增
@observer
export default class BillEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeList:[{name:'xs',number:'12'},{name:'xxs',number:'22'},{name:'m',number:'9'}]
        };
    }

    componentWillMount(){
        this.props.router.params.pk
    }

    setStateData = (data, callback) => {
        this.setState(data, ()=> {
            if (typeof callback == 'function')
                callback();
        })
    }
    render(){
        return (
            <div className="content">
                <div className="details_title">{this.props.router.params.pk ?"编辑":"新增"}订单</div>
                {/*1、订单信息**/}
                <BillEditOrder sizeList={this.state.sizeList} setStateData = {this.setStateData}/>
                {/*2、拍照上传款式图片，合同照片等**/}
                <BillEditUploadModule2 />
                {/*3、拍照上传采购单，录入布料采购及布款支付记录**/}
                <BillEditUploadModule3 />
                {/*3、拍照上传采购单，录入辅料采购及辅料款支付记录**/}
                <BillEditUploadModule4 />
                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.submit}>确定</button>
                            <button type="button" className='btn btn-default fr' onClick={this.exit}>取消</button>
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
        window.location.hash= '#/bossBill'
    }
}
