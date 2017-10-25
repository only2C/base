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
 * 拍照上传采购单，录入辅料采购及辅料款支付记录
 * */

export default class BillEditUploadModule4 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:['n'],
            picName:{},
            money:{},
            time:{},
            pic:{}
        }
    }

    addSizeModal =()=>{
        let list = this.state.list ;
        list.push("n"+new Date().getTime());
        this.setState({
            list
        })
    }

    setInput =(m,e)=>{
        let money=this.state.money ;
        money[m] = e.target.value ;
        this.setState({
            money
        })
    }
    setTime=(m,value, formattedValue)=>{
        let time = this.state.time ;
        time[m] =formattedValue ;
        this.setState({
            time
        })
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
                <h3 className="b-title">4、拍照上传采购单，录入辅料采购及辅料款支付记录<Button className="ml50" onClick={this.addSizeModal}>新增辅料记录</Button></h3>
                <div className="row" style={{marginTop:"30px"}}>
                    {this.state.list.map((m,n)=>{
                        return (
                            <div className="col-md-5 mt15">
                                <div className="b-upload-box col-md-6">
                                    <p className="b-upload-box-tag">{n+1}</p>
                                    {this.state.pic[m] ? (<img src={that.state.pic[m]}/>):(
                                        <FileUpload ref="fileUpload" onlySign={m} successCallBack ={this.uploadEvent}/>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="row b-edit">
                                        <div className=""  style={{"height":"50px"}}>
                                            辅料金额：
                                            <input type="text" placeholder="布款金额" className="b-input ml5" value={this.state.money[m]} onChange={this.setInput.bind(this,m)}/>
                                        </div>
                                        <div className="" style={{"height":"50px"}}>
                                            辅料时间：
                                            <DatePicker2 id={ "example-datepicker" + m } className="b-input ml5"
                                                         dateFormat="YYYY-MM-DD" value={this.state.time[m]} onChange={this.setTime.bind(this,m)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>

            </div>
        )
    }


}