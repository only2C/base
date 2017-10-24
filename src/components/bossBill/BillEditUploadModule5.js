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
    constructor(props){
        super(props);
        this.state={
            list:['n'],
            picName:{},
            money:{},
            time:{},
            param:{},
            list1To1:["list1To1"],
            list1To2:["list1To2"],
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
    render(){
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">5、录入裁剪、加工及工艺信息<Button className="ml50" onClick={this.addSizeModal}>新增</Button></h3>

                <div className="row" style={{marginTop:"30px"}}>
                    {this.state.list.map((m)=>{
                        return (
                            <div className="col-md-5 mt15">
                                <div className="col-md-5">
                                    <FileUpload />
                                </div>
                                <div className="col-md-6">
                                    <div className="row b-edit">
                                        <div className=""  style={{"height":"50px"}}>
                                            <div className="col-md-6">实际裁数：</div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="实际裁数" className="b-input" value={this.state.money[m]} onChange={this.setInput.bind(this,m)}/>
                                            </div>
                                        </div>
                                        <div className="" style={{"height":"50px"}}>
                                            <div className="col-md-6">完成时间：</div>
                                            <div className="col-md-6">
                                                <DatePicker2 id={ "example-datepicker" + m } className="b-input"
                                                             dateFormat="YYYY-MM-DD" value={this.state.time[m]} onChange={this.setTime.bind(this,m)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="row b-center">
                    <Button bsStyle="warning" onClick={this.handlerSave0}>保存</Button>
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