import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker2} from 'ssc-grid';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '../../config';
import globalStore from '../../stores/GlobalStore';
import FileUpload from '../bossBill/Upload';


/**
 * 拍照上传款式图片、合同照片等
 * */

export default class BillEditUploadModule2 extends React.Component {

    render(){
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">3、拍照上传采购单，录入布料采购及布款支付记录<Button className="ml50" onClick={this.addSizeModal}>新增布款记录</Button></h3>
                <div className="row" style={{marginTop:"30px"}}>
                    <div className="col-md-5">
                        <div className="col-md-5">
                            <FileUpload />
                        </div>
                        <div className="col-md-6">
                            <div className="row b-edit">
                                <div className=""  style={{"height":"50px"}}>
                                    <div className="col-md-6">布款金额：</div>
                                    <div className="col-md-6">   <input type="text" placeholder="布款金额"/></div>
                                 </div>
                                <div className="" style={{"height":"50px"}}>
                                    <div className="col-md-6">布款时间：</div>
                                    <div className="col-md-6">
                                        <DatePicker2 id="example-datepicker"
                                                                             dateFormat="YYYY-MM-DD" value="" onChange=""/>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="col-md-5">
                            <FileUpload />
                        </div>
                        <div className="col-md-6">
                            <div className="row b-edit">
                                <div className=""  style={{"height":"50px"}}>
                                    <div className="col-md-6">布款金额：</div>
                                    <div className="col-md-6">   <input type="text" placeholder="布款金额"/></div>
                                </div>
                                <div className="" style={{"height":"50px"}}>
                                    <div className="col-md-6">布款时间：</div>
                                    <div className="col-md-6">
                                        <DatePicker2 id="example-datepicker"
                                                     dateFormat="YYYY-MM-DD" value="" onChange=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>

            </div>
        )
    }


}