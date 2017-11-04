import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem,Modal } from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import Nav from '../../containers/bossBill/Nav';
import bossStore from '../../stores/bossBill/BossBillStore';
// 计件工资
const store = new bossStore();
@observer
export default class Salary extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            worker:[],  // 工人
            profession:[],   // 工种
            salaryList:[{"sku_code":"","worker":"","work":"","price":"","num":""}],
            professionModalShow:false,
            workerModalShow:false,
            addProfessionInputValue:"",
            sex:[{name:"男",id:"1"},{name:"女",id:"2"}],
            sexChecked:0,
            factory:[{id:1,name:'工厂1 '},{id:2,name:'工厂2 '}],
            addWorkerObj:{},
            salaryListResult:""


        }
    }

    componentWillMount(){
        // ajax result
    /*    let worker = [{"name":"圣斗士",id:'4548'},{"name":"奥特曼",id:'45148'}];
        let profession = [{"name":"钳工",id:'0'},{"name":"电焊工",id:'1'},{"name":"清洁工",id:'2'}];
        this.setState({
            worker,
            profession
        })*/
        let factoryId= this.props.router.params.pk;
        store.queryAllWorker({"factory_id":factoryId},(worker)=>{
            this.setState({
                worker,
            })
        })
        store.queryAllWork({"factory_id":factoryId},(profession)=>{
            this.setState({
                profession
            })
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
                    <div className="fr mb10 ">
                        <Button  bsStyle="warning" className="mr20" onClick={this.addTable}>新增计件</Button>
                        <Button  className="mr20" onClick={this.addProfession}>新增工种</Button>
                        <Button onClick={this.addWorker}>新增工人</Button>
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
                            {this.state.salaryList.map((m,n)=>{
                                return (
                                    <tr className="b-salary-tr" key={"salarylist"+n}>
                                        <td>{n+1}</td>
                                        <td><input type="text" placeholder="输入款号" className="b-input" value={m["sku_code"]} onChange={this.setSKU.bind(this,n)}/></td>
                                        <td>
                                            <select className="b-select" onClick={this.setSalaryListInput.bind(this,n,"worker")}>
                                                {this.state.worker.map((a,b)=>{
                                                    return(
                                                        <option key={"worker"+b} value={a.id}>{a.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td>
                                            <select className="b-select"  onClick={this.setSalaryListInput.bind(this,n,"work")}>
                                                {this.state.profession.map((c,d)=>{
                                                    return(
                                                        <option key={"profession"+d} value={c.id}>{c.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td><input type="text" placeholder="单价" value={m["price"]} className="b-input" onChange={this.setTableInput.bind(this,n,0)}/></td>
                                        <td><input type="text" placeholder="件数" value={m["num"]} className="b-input" onChange={this.setTableInput.bind(this,n,1)}/></td>
                                        <td><input type="text" placeholder="累计" value={m["total"]} className="b-input" disabled/></td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>

                    <div className="row b-center">
                        <p className="error">{this.state.salaryListResult}</p>
                        <Button bsStyle="warning" onClick={this.saveSalaryList}>保存</Button>
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
                            <Button bsStyle="warning" onClick={this.saveAddProfession}>确定</Button>
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
                            <div className="row ml150 mt10">
                                <span className="w100 fl">工厂：</span>
                                <select className="b-select"  onChange={this.setWorkerSelect}>
                                    {this.state.factory.map((m,n)=>{
                                        return (
                                            <option key={"factory"+n} value={m.id}>{m.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this,1)}>取消</Button>
                            <Button bsStyle="warning" onClick={this.saveAddWorker}>确定</Button>
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
        let salaryList = this.state.salaryList;
        salaryList.push({"sku_code":"","worker":"","work":"","price":"","num":""});
        this.setState({
            salaryList
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
        salaryList.forEach((m)=>{
            if(m["worker"] == ""){
                m["worker"] = worker
            }
            if(m["work"] == ""){
                m["work"] = work
            }
        })

        store.addSalary(salaryList,()=>{

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
            facrtory_id:this.props.router.params.pk
        }
        let profession = this.state.profession;
        store.addWork(param,()=>{
            profession.push({id:new Date().getTime(),name:param.name });
            this.setState({
                profession,
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
        let worker = this.state.worker ;
        let param ={
            name:addWorkerObj["name"],
            sex:addWorkerObj["sex"] || 1,
            iid:addWorkerObj["iid"] ,
            factory_id:addWorkerObj["factory_id"] || this.state.factory[0].id
        }
        store.addWorker(param,()=>{
            worker.push({id:"",name:param.name})
            this.setState({
                worker,
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
        }else{
            this.setState({
                workerModalShow:false
            })
        }
    }
    //取消
    exit = ()=>{
        window.location.hash= '#/bossBill/'+this.props.router.params.factoryId
    }
}