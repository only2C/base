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
 * 拍照上传款式图片，合同照片等
 * */

export default class BillEditUploadModule2 extends React.Component {

    render(){
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">2、输入订单信息<Button className="ml50" onClick={this.addSizeModal}>新增其他文件</Button></h3>
                <div className="row">
                    <div className="col-md-2">
                        <div>
                            <FileUpload />
                        </div>
                        <span>
                            名称A
                        </span>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>

            </div>
        )
    }


}