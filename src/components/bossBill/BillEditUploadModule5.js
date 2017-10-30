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
 * 录入裁剪、加工及工艺信息
 * */

export default class BillEditUploadModule5 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pic:[{name:"",url:"",id:"",finish_ts:""}],
            saveResult:'', // 保存结果
            picName:{},
            money:{},
            time:{},
            param:{},
            list1To1:["list1To1"],
            list1To2:["list1To2"],
        }
    }



    handlerInput = (m , e ) =>{
        let param = this.state.param;
        param[m]=e.target.value ;
        this.setState({
            param
        })
    }


    handlerSave0 =()=>{


    }
    handlerSave1 =()=>{
        let param = this.state.param ;
        let saveParam={
            name:param["price1"]
        }
        // do ajax

    }
    handlerSave2 =()=>{

    }
    handlerSave3 =()=>{

    }
    handlerSave4 =()=>{

    }

    addEvent1To1  =() =>{
        let list1To1 = this.state.list1To1 ;
        list1To1.push(new Date().getTime);
        this.setState({
            list1To1
        })

    }
    addEvent1To2  =() =>{
        let list1To2 = this.state.list1To2 ;
        list1To2.push(new Date().getTime);
        this.setState({
            list1To2
        })

    }
    
    addSizeModal = () =>{
        let pic = this.state.pic;
        let newPic = {"id":new Date().getTime()}
        pic.push(newPic);
        this.setState({
            pic
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

    setTime=(id,value, formattedValue)=>{
        let pic =this.state.pic ;
        pic.forEach((m,n)=>{
            if(m.id == id ){
                m.finish_ts = formattedValue ;
            }
        })
        this.setState({pic})
    }


    saveModule5 =()=>{
        let pic = this.state.pic ;
        let that = this;
        let result = [];
        pic.forEach((m,n)=>{
            result.push({"money":m.name , "url": m.url,"finish_ts":m.finish_ts})
        })
        let param ={
            'order_id':this.props.orderId ,
            'tech':result
        }
        store.saveTech(param,()=>{
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
                <h3 className="b-title">5、录入裁剪、加工及工艺信息<Button className="ml50" onClick={this.addSizeModal}>新增</Button></h3>
                <div className="row" style={{marginTop:"30px"}}>
                    {this.state.pic.map((m,n)=>{
                        m.id=m.id||new Date().getTime();
                        return (
                            <div className="col-md-5 mt15">
                                <div className="b-upload-box col-md-6">
                                    <p className="b-upload-box-tag">{n+1}</p>
                                    {m.url ?(<img src={m.url} className="b-upload-pic"/>) :(
                                        <FileUpload ref="fileUpload" id={m.id} successCallBack ={this.uploadEvent}/>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="row b-edit">
                                        <div className=""  style={{"height":"50px"}}>
                                            裁剪金额：
                                            <input type="text" value={m.name} placeholder="裁剪金额" onChange={this.setInput.bind(this,m.id)} className="b-input mt10 ml5 w200"/>
                                        </div>
                                        <div className="" style={{"height":"50px"}}>
                                            裁剪时间：
                                            <DatePicker2 id={ "example-datepicker" +n } className="b-input ml5 w200"
                                                         dateFormat="YYYY-MM-DD" value={m.finish_ts} onChange={this.setTime.bind(this,m.id)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>

                <div className="row b-center">
                    <p className="error">{this.state.saveResult}</p>
                    <Button bsStyle="warning" onClick={this.saveModule5}>保存</Button>
                </div>
                <div className="row b-border-line">
                    <h3 className="b-title">本厂加工</h3>
                    <div className="col-md-5">
                        单价合计：<input type="text" className="b-input" value={this.state.param["price1"]} onChange={this.handlerInput.bind(this,"price1")}/>
                    </div>
                    <div className="col-md-5">
                        件数：<input type="text" className="b-input" value={this.state.param["count1"]} onChange={this.handlerInput.bind(this,"count1")}/>
                    </div>
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning" onClick={this.handlerSave1}>保存</Button>
                </div>


                <div className="row b-border-line">
                    <h3 className="b-title">外发加工<Button className="ml50" onClick={this.addEvent1To1}>新增</Button></h3>
                    {this.state.list1To1.map((m,n)=>{
                        return (
                            <div key={"list1to1"+n} className="mt20" style={{"overflow":"hidden"}}>
                                <div className="col-md-3">
                                    外发工厂：
                                    <select className="b-select">
                                        <option>123</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    外发项目：
                                    <select className="b-select">
                                        <option>123</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    外发价格：<input type="text" className="b-input"/>
                                </div>
                                <div className="col-md-3">
                                    件数：<input type="text" className="b-input"/>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className="row b-center">
                    <Button bsStyle="warning">保存</Button>
                </div>


                <div className="row b-border-line">
                    <h3 className="b-title">外发工艺<Button className="ml50" onClick={this.addEvent1To2}>新增</Button></h3>
                    {this.state.list1To2.map((m,n)=>{
                        return (
                            <div key={"list1to1"+n} className="mt20" style={{"overflow":"hidden"}}>
                                <div className="col-md-3">
                                    工艺厂：
                                    <select className="b-select">
                                        <option>123</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    工艺项目：
                                    <select className="b-select">
                                        <option>123</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    工艺价格：<input type="text" className="b-input"/>
                                </div>
                                <div className="col-md-3">
                                    件数：<input type="text" className="b-input"/>
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