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
            pic:[{num:"",url:"",id:"",finish_ts:""}],
            saveResult:'', // 保存结果
            picName:{},
            money:{},
            time:{},
            param:{},
            selfWork:[{"money":"",num:""}],
            selfWorkResult:"",
            outWork:[{"money":"","num":"","outfactory_id":"","outitem_id":""}],
            outWorkResult:"",
            outTech:[{"money":"","num":"","outfactory_id":"","outitem_id":""}],
            outTechResult:"",
            outfactoryList:[],
            outFactoryItemList:[] , //外发工厂项目
            outTechList:[], //外发工艺项目
        }
    }

    componentWillMount(){
        this.queryOutfactoryList();

    }

    componentWillReceiveProps= (props) =>{
        if(props.techData){  //录入裁剪、加工及工艺信息
            this.getTechData(props.techData);
        }
        if(props.selfworksData){  // 本次加工
            this.getSelfwork(props.selfworksData)

        }
        if(props.outworkData){ //外发加工
            this.getOutwork(props.outworkData)
        }
        if(props.outtechData){  //外发工艺
            this.getOuttech(props.outtechData)
        }

    }

    getTechData = (data) =>{
        if(data){
            this.setState({
                pic:[ data ]
            })
        }
    }

    getSelfwork = (data) =>{
        if(data){
            this.setState({
                selfWork:[data]
            })
        }

    }
    getOutwork = (data)=>{
        if(!data.outworks||data.outworks.length<0 ){
            return ;
        }
        this.setState({
            outWork:data.outworks
        })

    }

    getOuttech =(data) =>{
        if(!data.outtechs||data.outtechs.length<0 ){
            return ;
        }
        this.setState({
            outTech:data.outtechs
        })
    }

    // 获取外发工厂和外发项目
    queryOutfactoryList = ()=>{
        let factoryId =this.props.factoryId
        store.queryOutFactory({factory_id:factoryId},()=>{
            this.setState({
                outfactoryList:store.outFactoryList
            })
        })
        store.queryOutFactoryItem({factory_id:factoryId},()=>{
            this.setState({
                outFactoryItemList:store.outFactoryItemList
            })
        })
        store.queryOuttechItem({factory_id:factoryId},()=>{
            this.setState({
                outTechList:store.outTechList
            })
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
                m.num = e.target.value ;
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
        let result = {};
        pic.forEach((m,n)=>{
            if(n==0){
                result.num = m.num
                result.url = m.url
                result.finish_ts = m.finish_ts
            }

            // result.push({"money":m.name , "url": m.url,"finish_ts":m.finish_ts})
        })

        let param ={
            'order_id': this.props.orderId,
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

    //本厂加工信息 start
    setSelfWork = (index , type ,e)=>{
        let selfWork = this.state.selfWork ;
        selfWork[index][type] = e.target.value ;
        this.setState({
            selfWork
        })

    }

    addSelfWork = () =>{
        let selfWork = this.state.selfWork ;
        selfWork.push({"money":"",num:""});
        this.setState({
            selfWork
        })
    }

    saveSelfWork =()=>{
        let that = this ;
        let param ={
            "order_id":this.props.orderId ,
            "works":this.state.selfWork[0]
        }
        store.saveSelfWork(param ,()=>{

            let selfWorkResult = "保存成功!";
            this.setState({
                selfWorkResult
            },()=>{
                setTimeout(()=>{
                    that.setState({
                        selfWorkResult:""
                    })
                },3000)
            })
        })
    }

    //本厂加工信息 end

    // 外厂加工信息 start

    setOutfactorySelect=(param,type , e)=>{
        let el = $(e.currentTarget).find("option:selected");
        let outWork = this.state.outWork;
        outWork[param][type] = el.val();
        this.setState({
            outWork
        })

    }

    addOutWork =()=>{
        let outWork = this.state.outWork ;
        outWork.push({"money":"","num":"","outitem_id":"","outfactory_id":""});
        this.setState({
            outWork
        })

    }

    setOutWork =(index , type ,e)=>{
        let outWork = this.state.outWork ;
        outWork[index][type]=e.target.value ;
        this.setState({
            outWork
        })
    }

    saveOutWork =()=>{
        let that = this ;
        let outWork = this.state.outWork ;
        let default1 = this.state.outfactoryList[0].id
        let default2 = this.state.outFactoryItemList[0].id
        outWork.forEach((m)=>{
            if(m.outitem_id ==""){
                m.outitem_id = default1;
            }
            if(m.outfactory_id ==""){
                m.outfactory_id = default2;
            }
        })

        let param = {
            order_id : this.props.orderId ,
            outworks:outWork
        }
        store.saveOutwork(param,()=>{
            let outWorkResult = "保存成功!";
            this.setState({
                outWorkResult
            },()=>{
                setTimeout(()=>{
                    that.setState({
                        outWorkResult:""
                    })
                },3000)
            })
        })

    }

    // 外厂加工信息  end

    // 外厂工艺信息 start
    setTeachSelect = (param,type , e)=>{
        let el = $(e.currentTarget).find("option:selected");
        let outTech = this.state.outTech;
        outTech[param][type] = el.val();
        this.setState({
            outTech
        })

    }
    addOutTech =()=>{
        let outTech = this.state.outTech ;
        outTech.push({"money":"","num":""});
        this.setState({
            outTech
        })

    }

    setOutTech =(index , type ,e)=>{
        let outTech = this.state.outTech ;
        outTech[index][type]=e.target.value ;
        this.setState({
            outTech
        })
    }

    saveOutTech=()=>{
        let that = this ;
        let outTech = this.state.outTech ;
        let default1 = this.state.outfactoryList[0].id
        let default2 = this.state.outTechList[0].id
        outTech.forEach((m)=>{
            if(m.outitem_id ==""){
                m.outitem_id = default1;
            }
            if(m.outfactory_id ==""){
                m.outfactory_id = default2;
            }
        })
        let param = {
            order_id : this.props.orderId ,
            outsubs:this.state.outTech
        }

        store.saveOutTech(param,()=>{
            let outTechResult = "保存成功!";
            this.setState({
                outTechResult
            },()=>{
                setTimeout(()=>{
                    that.setState({
                        outTechResult:""
                    })
                },3000)
            })
        })

    }
    //修改上传
    updateFileUpload = (index) =>{
        let pic = this.state.pic ;
        pic[index].url ="";
        this.setState({
            pic
        })
    }
    // 外厂工艺信息  end

    render(){
        let that = this;
        return (
            <div className="stdreimburse-box ">
                <h3 className="b-title">5、录入裁剪、加工及工艺信息</h3>
                <div className="row" style={{marginTop:"30px"}}>
                    {this.state.pic.map((m,n)=>{
                        m.id=m.id||new Date().getTime();
                        return (
                            <div className="col-md-6 mt15">
                                <div className="b-upload-box col-md-6">
                                    <p className="b-upload-box-tag">{n+1}</p>
                                    {m.url ?(<img src={Config.serverUrl + m.url} className="b-upload-pic" onClick={this.updateFileUpload.bind(this,n)}/>) :(
                                        <FileUpload ref="fileUpload" id={m.id} successCallBack ={this.uploadEvent}/>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="row b-edit">
                                        <div className=""  style={{"height":"50px"}}>
                                            裁剪数量：
                                            <input type="text" value={m.num} placeholder="裁剪数量" onChange={this.setInput.bind(this,m.id)} className="b-input mt10 ml5 w200"/>
                                        </div>
                                        <div className="" style={{"height":"50px"}}>
                                            完成时间：
                                            <DatePicker2 id={ "example-datepicker-" +n } className="b-input ml5 w200"
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
                    <h3 className="b-title">本厂加工{/*<Button className="ml50" onClick={this.addSelfWork}>新增</Button>*/}</h3>
                    {this.state.selfWork.map((m,n)=>{
                        return (
                            <div className="b-self-box fl" key={"selfwork-"+n}>
                                <div className="mt15">
                                    <span className="b-edit-tit">单价合计：</span>
                                    <input type="text" className="b-input" value={this.state.selfWork[n].money} onChange={this.setSelfWork.bind(this,n,"money")}/>
                                </div>
                                <div className="mt15">
                                    <span className="b-edit-tit">件数：</span>
                                    <input type="text" className="b-input" value={this.state.selfWork[n].num} onChange={this.setSelfWork.bind(this,n,"num")}/>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="row b-center">
                    <p className="error">{this.state.selfWorkResult}</p>
                    <Button bsStyle="warning" onClick={this.saveSelfWork}>保存</Button>
                </div>


                <div className="row b-border-line">
                    <h3 className="b-title">外发加工<Button className="ml50" onClick={this.addOutWork}>新增</Button></h3>
                    {this.state.outWork.map((m,n)=>{
                        return (
                            <div key={"list1to1"+n} className="mt20" style={{"overflow":"hidden"}}>
                                <div className="col-md-3">
                                    外发工厂：
                                    <select className="b-select" onChange={this.setOutfactorySelect.bind(this,n,"outfactory_id")}>
                                        {that.state.outfactoryList.map((y,z)=>{
                                            if(typeof m.outfactory == "object"){
                                                return (
                                                    <option key={"outfactoryList-"+z} value={y.id} selected={ m.outfactory.id == y.id ? "selected":""}>{y.name}</option>
                                                )

                                            }else{
                                                return (
                                                    <option key={"outfactoryList-"+z} value={y.id}>{y.name}</option>
                                                )
                                            }

                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    外发项目：
                                    <select className="b-select" onChange={this.setOutfactorySelect.bind(this,n,"outitem_id")}>
                                        {that.state.outFactoryItemList.map((r,s)=>{
                                            if(typeof m.outitem == "object"){
                                                return (
                                                    <option key={"outFactoryItemList-"+s} value={r.id} selected={ m.outitem.id == r.id ? "selected":""}>{r.name}</option>
                                                )
                                            }else{
                                                return (
                                                    <option key={"outFactoryItemList-"+s} value={r.id}>{r.name}</option>
                                                )
                                            }



                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    外发价格：<input type="text" className="b-input" value={this.state.outWork[n].money} onChange={this.setOutWork.bind(this,n,"money")}/>
                                </div>
                                <div className="col-md-3">
                                    件数：<input type="text" className="b-input" value={this.state.outWork[n].num}  onChange={this.setOutWork.bind(this,n,"num")}/>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className="row b-center">
                    <p className="error">{this.state.outWorkResult}</p>
                    <Button bsStyle="warning" onClick={this.saveOutWork}>保存</Button>
                </div>


                <div className="row b-border-line">
                    <h3 className="b-title">外发工艺<Button className="ml50" onClick={this.addOutTech}>新增</Button></h3>
                    {this.state.outTech.map((m,n)=>{
                        return (
                            <div key={"list1to1"+n} className="mt20" style={{"overflow":"hidden"}}>
                                <div className="col-md-3">
                                    工艺厂：
                                    <select className="b-select" onChange={this.setTeachSelect.bind(this,n,"outfactory_id")}>
                                        {that.state.outfactoryList.map((y,z)=>{
                                            return (
                                                <option key={"outfactoryList-"+z} value={y.id}>{y.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    工艺项目：
                                    <select className="b-select" onChange={this.setTeachSelect.bind(this,n,"outitem_id")} >
                                        {that.state.outTechList.map((y,z)=>{
                                            return (
                                                <option key={"outfactoryList-"+z} value={y.id}>{y.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    工艺价格：<input type="text" className="b-input" value={this.state.outTech[n].money} onChange={this.setOutTech.bind(this,n,"money")}/>
                                </div>
                                <div className="col-md-3">
                                    件数：<input type="text" className="b-input" value={this.state.outTech[n].num}  onChange={this.setOutTech.bind(this,n,"num")}/>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className="row b-center">
                    <p className="error">{this.state.outTechResult}</p>
                    <Button bsStyle="warning" onClick={this.saveOutTech}>保存</Button>
                </div>



            </div>
        )
    }


}