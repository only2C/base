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
 * 录入裁剪、加工及工艺信息
 * */

export default class BillEditUploadModule5 extends React.Component {

    render(){
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">5、录入裁剪、加工及工艺信息<Button className="ml50" onClick={this.addSizeModal}>新增</Button></h3>
                <div className="row" style={{marginTop:"30px"}}>
                    <div className="col-md-5">
                        <div className="col-md-5">
                            <FileUpload />
                        </div>
                        <div className="col-md-6">
                            <div className="row b-edit">
                                <div className=""  style={{"height":"50px"}}>
                                    <div className="col-md-6">实际裁数：</div>
                                    <div className="col-md-6">   <input type="text" placeholder="实际裁数"/></div>
                                 </div>
                                <div className="" style={{"height":"50px"}}>
                                    <div className="col-md-6">完成时间：</div>
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


                <div className="row">
                    <h3 className="b-title">本厂加工</h3>
                    <div className="col-md-5">
                        单价合计：<input type="text"/>
                    </div>
                    <div className="col-md-5">
                        件数：<input type="text"/>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>


                <div className="row">
                    <h3 className="b-title">外发加工<Button className="ml50" >新增</Button></h3>
                    <div className="col-md-4">
                        外发工厂：
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        外发项目：
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        外发价格：<input type="text"/>
                    </div>
                    <div className="col-md-4">
                        件数：<input type="text"/>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>


                <div className="row">
                    <h3 className="b-title">外发工艺<Button className="ml50">新增</Button></h3>
                    <div className="col-md-4">
                        工艺厂：
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        工艺项目：
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        工艺价格：<input type="text"/>
                    </div>
                    <div className="col-md-4">
                        件数：<input type="text"/>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>



            </div>
        )
    }


}