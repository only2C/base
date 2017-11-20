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
import BossStore from '../../stores/bossBill/BossBillStore';
const store = new BossStore();

/**
 * 拍照上传款式图片，合同照片等
 * */

export default class BillEditUploadModule2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pic:[{name:"",url:"",id:""}],
            saveResult:'', // 保存结果
        }
    }

    addSizeModal = () =>{
        let pic = this.state.pic;
        let newPic = {"id":new Date().getTime()}
        pic.push(newPic);
        this.setState({
            pic
        })
    }
    componentWillReceiveProps= (props) =>{
        if(props.imgData){
            this.getEditData(props.imgData);
        }

    }

    getEditData = (data)=>{
        if(!data.imgs || data.imgs.length <0 ){
            return ;
        }
        this.setState({
            pic:data.imgs
        })
    }

    uploadEvent =(data)=>{
        let pic =this.state.pic ;
        pic.forEach((m,n)=>{
            if(m.id == data.id ){
                m.url = data.img_url
            }
        })
        this.setState({pic})

    }

    setInput =(id,e) =>{
        let pic =this.state.pic ;
        pic.forEach((m,n)=>{
            if(m.id == id ){
                m.name = e.target.value ;
            }
        })
        this.setState({pic})
    }

    //修改上传
    updateFileUpload = (index) =>{
        let pic = this.state.pic ;
        pic[index].url ="";
        this.setState({
            pic
        })
    }


    saveModule2 =()=>{
        let pic = this.state.pic ;
        let that = this;
        let result = [];
        pic.forEach((m,n)=>{
            result.push({"name":m.name , "url": m.url})
        })
        let param ={
            'order_id':this.props.orderId ,
            'imgs':result
        }
        store.saveOrderImg(param,()=>{
            let saveResult = "保存成功!";
            this.setState({
                saveResult
            },()=>{
                setTimeout(()=>{
                    that.setState({
                        saveResult:""
                    })
                },3000)
            })

        })

    }


    render(){
        let that = this ;
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">2、输入订单信息<Button className="ml50" onClick={this.addSizeModal}>新增其他文件</Button></h3>
                <div className="row">
                    {this.state.pic.map((m,n)=>{
                        m.id=m.id||new Date().getTime();
                        return (
                            <div className="col-md-3 mt20" key={"up1-"+n}>
                                <div className="b-upload-box">
                                    <p className="b-upload-box-tag">{n+1}</p>
                                    {m.url  ?(
                                       <img src={Config.serverUrl + m.url} className="b-upload-pic" onClick={this.updateFileUpload.bind(this,n)}/>
                                    ) :(
                                        <FileUpload ref="fileUpload" id={m.id} successCallBack ={this.uploadEvent}/>
                                    )}

                                </div>
                                <input type="text" value={m.name} placeholder="请输入图片名称" onChange={this.setInput.bind(this,m.id)} className="b-input mt10 w200"/>
                            </div>
                        )

                    })}

                </div>
                <div className="row b-center">
                    <p className="error">{this.state.saveResult}</p>
                    <Button bsStyle="warning" onClick={this.saveModule2}>保存</Button>
                </div>

            </div>
        )
    }


}