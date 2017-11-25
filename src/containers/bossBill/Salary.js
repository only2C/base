import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem,Modal } from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import Nav from '../../containers/bossBill/Nav';
import bossStore from '../../stores/bossBill/BossBillStore';
import { MonthPicker } from 'ssc-grid'
// 计件工资
const store = new bossStore();
@observer
export default class Salary extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            worker:[],  // 工人
            profession:[],   // 工种
            salaryModalShow:false,
            salaryList:[{"sku_code":"","worker_id":"","profession_id":"","price":"","num":""}],
            professionModalShow:false,
            workerModalShow:false,
            addProfessionInputValue:"",
            sex:[{name:"男",id:"1"},{name:"女",id:"2"}],
            sexChecked:0,
            factory:[{id:1,name:'工厂1 '},{id:2,name:'工厂2 '}],
            addWorkerObj:{},
            salaryListResult:"",
            salaryWorker:"",
            allSalaryList:[],
            timeValue: new Date().getFullYear() + "-" + ( new Date().getMonth()+1), // 时间


        }
    }

    componentWillMount(){
        this.getAllWorker();
        this.getAllWork();
        this.querySalary();
    }


    querySalary = ()=>{
        let param ={
            "query_ts":this.state.timeValue,
            "worker":this.state.salaryWorker,
            "factory_id":this.props.router.params.factoryId
        }
        store.queryAllSalary(param,(data)=>{
            this.setState({
                allSalaryList:data.detials,
                summarizes:data.summarizes
            })
        })
    }

    getAllWorker= ()=>{
        let factoryId= this.props.router.params.factoryId;
        store.queryAllWorker({"factory_id":factoryId},(worker)=>{
            this.setState({
                worker,
            })
        })
    }

    getAllWork=()=>{
        let factoryId= this.props.router.params.factoryId;
        store.queryAllWork({"factory_id":factoryId},(profession)=>{
            this.setState({
                profession
            })
        })
    }

    handleTimeChange = (value, formattedValue)=>{
        this.setState({
            timeValue:formattedValue
        })
    }

    setWorkSearchSelect = (e) =>{
        let el = $(e.currentTarget).find("option:selected");
        this.setState({
            salaryWorker:el.val()
        })
    }
    componentWillReceiveProps(props) {
        // this.setState({})
    }

    render(){
        return(
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">计件工资</div>
                <div className="stdreimburse-box ">
                    <div className="fl">
                        <div className="fl b-monthPicker">
                            <MonthPicker value={this.state.timeValue} onChange={this.handleTimeChange}/>
                        </div>
                        <select className="b-select mr20"  onChange={this.setWorkSearchSelect}>
                            {this.state.worker.map((m,n)=>{
                                return (
                                    <option key={ "client-"+n} value={m.id}>{m.name}</option>
                                )
                            })
                            }
                        </select>
                        <Button  onClick={this.querySalary} bsStyle="warning" className="glyphicon glyphicon-search ml30" ><span className="fr" style={{"margin":"-2px 0 0 4px"}}>搜索</span></Button>
                        <span className="ml20 mr20">工资总和：{this.state.summarizes ? this.state.summarizes.salary : 0  }</span>
                        <span className="ml20 mr20">件数总和：{this.state.summarizes ? this.state.summarizes.product_num : 0  }</span>
                    </div>
                    <div className="fr mb10 ">
                        <Button  className="mr20" bsStyle="warning" onClick={this.addTable}>新增计件</Button>
                        <Button  className="mr20" bsStyle="warning" onClick={this.addProfession}>新增工种</Button>
                        <Button onClick={this.addWorker} bsStyle="warning">新增工人</Button>
                    </div>
                    <div className="standard-grid">
                        <table  className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>款号</th>
                                    <th>姓名</th>
                                    <th>工种</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>累计</th>
                                </tr>
                            </thead>
                            <tbody>
                            { this.state.allSalaryList.map((m,n)=>{
                                return (
                                    <tr className="b-salary-tr" key={"salarylist"+n}>
                                       <td>{n+1}</td>
                                       <td>{m.skc_code}</td>
                                       <td>{m.worker ? m.worker.name:""}</td>
                                       <td>{m.work ? m.work.name:""}</td>
                                       <td>{m.price}</td>
                                       <td>{m.num}</td>
                                       <td>{parseFloat(m.price*m.num)}</td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>

                    {/**新增工种*/}
                    <Modal show={this.state.professionModalShow} onHide={this.closeModal.bind(this,0)}>
                        <Modal.Header closeButton>
                            <Modal.Title>新增工种</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row ml200">
                                工种名称:<input type="text" value ={this.state.addProfessionInputValue} className="b-input ml20" onChange={this.addProfessionInput} placeholder="请输入工种名称"/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this,0)}>取消</Button>
                            <Button bsStyle="success" onClick={this.saveAddProfession}>确定</Button>
                        </Modal.Footer>
                    </Modal>

                    {/**新增工人*/}
                    <Modal show={this.state.workerModalShow} onHide={this.closeModal.bind(this,1)}>
                        <Modal.Header closeButton>
                            <Modal.Title>新增工人</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">姓名：</span><input type="text" className=" b-input" value={this.state.addWorkerObj["name"]} onChange={this.handlerAddWorkInput.bind(this,"name")} placeholder="请输入姓名"/>
                            </div>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">身份证号：</span><input type="text" className=" b-input" value={this.state.addWorkerObj["iid"]} placeholder="身份证号" onChange={this.handlerAddWorkInput.bind(this,"iid")}/>
                            </div>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">性别：</span>
                                <ul className="b-salary-radio">
                                    {this.state.sex.map((m,n)=>{
                                        return(
                                            <li key={"sex"+n} onChange={this.setWorkerRadio.bind(this,m.id,n)}><input type="radio"  checked={this.state.sexChecked == n ? true :''}/><span  className="b-radio-1">{m.name}</span></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this,1)}>取消</Button>
                            <Button bsStyle="success" onClick={this.saveAddWorker}>确定</Button>
                        </Modal.Footer>
                    </Modal>


                    {/**新增计件*/}
                    <Modal show={this.state.salaryModalShow} onHide={this.closeModal.bind(this,2)}>
                        <Modal.Header closeButton>
                            <Modal.Title>新增计件</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.salaryList.map((m,n)=>{
                                return (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span>款号：</span>
                                            <input type="text" placeholder="输入款号" className="b-input" value={m["sku_code"]} onChange={this.setSKU.bind(this,n)}/>
                                        </div>
                                        <div className="col-md-6">
                                            <span>姓名：</span>
                                            <select className="b-select" onClick={this.setSalaryListInput.bind(this,n,"worker_id")}>
                                                {this.state.worker.map((a,b)=>{
                                                    return(
                                                        <option key={"worker"+b} value={a.id}>{a.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mt20">
                                            <span>工种：</span>
                                            <select className="b-select"  onClick={this.setSalaryListInput.bind(this,n,"profession_id")}>
                                                {this.state.profession.map((c,d)=>{
                                                    return(
                                                        <option key={"profession"+d} value={c.id}>{c.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mt20">
                                            <span>单价：</span>
                                            <input type="text" placeholder="单价" value={m["price"]} className="b-input" onChange={this.setTableInput.bind(this,n,0)}/>
                                        </div>
                                        <div className="col-md-6 mt20">
                                            <span>数量：</span>
                                            <input type="text" placeholder="件数" value={m["num"]} className="b-input" onChange={this.setTableInput.bind(this,n,1)}/>
                                        </div>
                                        <div className="col-md-6 mt20">
                                            <span>累计：</span>
                                            <input type="text" placeholder="累计" value={m["total"]} className="b-input" disabled/>
                                        </div>

                                    </div>
                                    )}
                            )}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this,2)}>取消</Button>
                            <Button bsStyle="success" onClick={this.saveSalaryList}>确定</Button>
                        </Modal.Footer>
                    </Modal>

                </div>

                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //新增行 列
    addTable =()=>{
        // let salaryList = this.state.salaryList;
        // salaryList.push({"sku_code":"","worker_id":"","profession_id":"","price":"","num":""});
        this.setState({
            salaryModalShow:true
        })

    }

    setSKU = (id,e)=>{
        let salaryList = this.state.salaryList ;
        salaryList[id]["sku_code"] = e.target.value ;
        this.setState({
            salaryList
        })
    }

    setSalaryListInput =(id,type,e)=>{
        let el = $(e.currentTarget).find("option:selected");
        let salaryList = this.state.salaryList ;
        salaryList[id][type] = el.val();
        this.setState({
            salaryList
        })
    }


    // 设置表格数据  单价 ，数量 ，总价
    setTableInput =(i,type,e)=>{
        let salaryList = this.state.salaryList ;
        if(type == 0 ){
            salaryList[i]["price"] = e.target.value
        }
        if(type == 1 ){
            salaryList[i]["num"] = e.target.value
        }
        if(salaryList[i]["price"] && salaryList[i]["num"] ){
            salaryList[i]["total"] = Util.formatCurrency( parseFloat(salaryList[i]["price"] )*parseFloat(salaryList[i]["num"] ))
        }
        this.setState({
            salaryList
        })
    }

    saveSalaryList = ()=>{
        let salaryList = this.state.salaryList;
        //
        let that = this;
        let worker = this.state.worker ? this.state.worker[0].id :"" ;
        let work = this.state.profession ?this.state.profession[0].id:"";
        let param = salaryList[0];
        param.factory_id = this.props.router.params.factoryId;
        if(param.worker_id ==""){
            param.worker_id = worker
        }
        if(param.profession_id =="" ){
            param.profession_id = work
        }
        /*salaryList.forEach((m)=>{
            m.factory_id = this.props.router.params.factoryId;
            if(m["worker_id"] == ""){
                m["worker_id"] = worker
            }
            if(m["profession_id"] == ""){
                m["profession_id"] = work
            }
        })*/
        store.addSalary(param,()=>{

            this.setState({
                salaryListResult:"保存成功！"
            },()=>{
                setTimeout(()=>{
                    that.setState({
                        salaryListResult:""
                    })
                },3000)
            })
        })
    }

    // 新增工种
    addProfession = () =>{
        this.setState({
            professionModalShow:true
        })
    }

    saveAddProfession =() =>{
        let param = {
            name:this.state.addProfessionInputValue,
            factory_id:this.props.router.params.factoryId
        }
        store.addWork(param,()=>{
            this.queryAllWork();
            this.setState({
                professionModalShow:false
            })

        })
    }

    addProfessionInput =(e)=>{
       this.setState({
           addProfessionInputValue:e.target.value 
       })
    }


    // 新增工人 start
    addWorker =() =>{
        this.setState({
            workerModalShow:true,
            addWorkerObj:{}
        })
    }

    handlerAddWorkInput = (type , e )=>{
        let addWorkerObj = this.state.addWorkerObj ;
        addWorkerObj[type] = e.target.value ;
        this.setState({
            addWorkerObj
        })
    }

    setWorkerRadio = (v,n) =>{
        let addWorkerObj = this.state.addWorkerObj;
        addWorkerObj["sex"] = v
        this.setState({
            sexChecked:n,
            addWorkerObj
        })
    }

    setWorkerSelect = (e) =>{
        let addWorkerObj = this.state.addWorkerObj ;
        let el = $(e.currentTarget).find("option:selected");
        addWorkerObj["factory_id"] = el.val();
        this.setState({
            addWorkerObj
        })
    }

    saveAddWorker = ()=>{
        let addWorkerObj = this.state.addWorkerObj ;
        let param ={
            name:addWorkerObj["name"],
            sex:addWorkerObj["sex"] || 1,
            iid:addWorkerObj["iid"] ,
            factory_id: this.props.router.params.factoryId
        }
        store.addWorker(param,()=>{
            this.queryAllWork();
            this.setState({
                workerModalShow:false
            })

        })

    }

    // 新增工人 end

    closeModal = (param) =>{
        if(param == 0 ){
            this.setState({
                addProfessionInputValue:"",
                professionModalShow:false
            })
        }else if(param == 1){
            this.setState({
                workerModalShow:false
            })
        }else{
            this.setState({
                salaryModalShow:false
            })
        }
    }
    //取消
    exit = ()=>{
        window.location.hash= '#/bossBill/'+this.props.router.params.factoryId
    }
}