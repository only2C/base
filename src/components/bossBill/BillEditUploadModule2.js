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
    constructor(props){
        super(props);
        this.state={
            list:['n'],
            picName:{},
            pic:{}
        }
    }

    addSizeModal = () =>{
        let list = this.state.list ;
        list.push("n"+new Date().getTime());
        this.setState({
            list
        })

    }

    setInput =(m,e) =>{
        let picName = this.state.picName;
        picName[m] = e.target.value ;
        this.setState({
            picName
        })
    }


    saveModule2 =()=>{

        
    }

    uploadEvent =(data)=>{
        let pic =this.state.pic ;
        pic[data.onlySign] = data.url ;
        this.setState({
            pic
        })
    }

    render(){
        let that = this ;
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">2、输入订单信息<Button className="ml50" onClick={this.addSizeModal}>新增其他文件</Button></h3>
                <div className="row">
                    {this.state.list.map( (m,n)=>{
                        return (
                            <div className="col-md-2 mt20" key={m}>
                                <div className="b-upload-box">
                                    <p className="b-upload-box-tag">{n+1}</p>
                                {this.state.pic[m] ? (<img src={that.state.pic[m]}/>):(
                                    <FileUpload ref="fileUpload" onlySign={m} successCallBack ={this.uploadEvent}/>
                                )}
                                </div>
                                <input type="text" value={this.state.picName[m]} placeholder="请输入图片名称" onChange={this.setInput.bind(this,m)} className="b-input mt10"/>
                            </div>
                        )
                    })}

                </div>
                <div className="row b-center">
                    <Button bsStyle="warning" onClick={this.saveModule2}>保存</Button>
                </div>

            </div>
        )
    }


}