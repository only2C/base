import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem,Modal } from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import Nav from '../../containers/bossBill/Nav';
// 计件工资

@observer
export default class Salary extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            worker:[],  // 工人
            profession:[],   // 工种
            salaryList:["salaryList"],
            professionModalShow:false,
            workerModalShow:false,

            addWorkerInputValue:{
                name:"",
                idCard:""
            } ,
            addProfessionInputValue:"",


            tPrice:{},
            tNum:{},
            tTotal:{},

            sex:[{name:"男",id:"1"},{name:"女",id:"2"}],
            sexChecked:0,
            factory:[{id:1,name:'工厂1 '},{id:2,name:'工厂2 '}],
            addWorkerObj:{},
            sexChecked:0

        }
    }

    componentWillMount(){
        // ajax result
        let worker = [{"name":"圣斗士",id:'4548'},{"name":"奥特曼",id:'45148'}];
        let profession = [{"name":"钳工",id:'0'},{"name":"电焊工",id:'1'},{"name":"清洁工",id:'2'}];
        this.setState({
            worker,
            profession
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
                                        <td><input type="text" placeholder="输入款号" className="b-input" value="" /></td>
                                        <td>
                                            <select className="b-select">
                                                {this.state.worker.map((m,n)=>{
                                                    return(
                                                        <option key={"worker"+n} value={m.id}>{m.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td>
                                            <select className="b-select">
                                                {this.state.profession.map((m,n)=>{
                                                    return(
                                                        <option key={"profession"+n} value={m.id}>{m.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td><input type="text" placeholder="单价" value={this.state.tPrice[m]} className="b-input" onChange={this.setTableInput.bind(this,m,0)}/></td>
                                        <td><input type="text" placeholder="件数" value={this.state.tNum[m]} className="b-input" onChange={this.setTableInput.bind(this,m,1)}/></td>
                                        <td><input type="text" placeholder="累计" value={this.state.tTotal[m]} className="b-input" disabled/></td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>

                    <div className="row b-center">
                        <Button bsStyle="warning">保存</Button>
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
                            <Button bsStyle="warning" onClick={this.handlerAddProfession}>确定</Button>
                        </Modal.Footer>
                    </Modal>

                    {/**新增工人*/}
                    <Modal show={this.state.workerModalShow} onHide={this.closeModal.bind(this,1)}>
                        <Modal.Header closeButton>
                            <Modal.Title>新增工人</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">姓名：</span><input type="text" className="ml20 b-input" value={this.state.addWorkerObj["name"]} onChange={this.handlerAddWorkInput.bind(this,"name")} placeholder="请输入姓名"/>
                            </div>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">身份证号：</span><input type="text" className="ml20 b-input" value={this.state.addWorkerObj["iid"]} placeholder="身份证号" onChange={this.handlerAddWorkInput.bind(this,"iid")}/>
                            </div>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">性别：</span>
                                <ul>
                                    {this.state.sex.map((m,n)=>{
                                        return(
                                            <li key={"sex"+n} onChange={this.setWorkerRadio.bind(this,m.id,n)}><input type="radio" className="b-radio"  checked={this.state.sexChecked == n ? true :''}/><span  className="b-radio-1">{m.name}</span></li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="row ml150 mt10">
                                <span className="w100 fl">工厂：</span>
                                <select className="b-select">
                                    {this.state.factory.map((m,n)=>{
                                        return (
                                            <option key={"factory"+n} value={m.id} onChange={this.setWorkerSelect}>{m.name}</option>
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
        salaryList.push("salaryList"+new Date().getTime());
        this.setState({
            salaryList
        })

    }

    // 设置表格数据  单价 ，数量 ，总价
    setTableInput =(m,i,e)=>{
        let tPrice = this.state.tPrice,
            tNum = this.state.tNum ,
            tTotal = this.state.tTotal,
            el = e.target.value ;
        if(i==0){
            tPrice[m] = el ;
            if(parseFloat(tPrice[m]) && parseFloat(tNum[m])){
                tTotal[m] =Util.formatCurrency( parseFloat(tPrice[m])*parseFloat(tNum[m])) ;
            }else
                tTotal[m] = "0.00"
            this.setState({
                tPrice,
                tTotal
            })

        }else if(i==1){
            tNum[m] = el ;
            if(parseFloat(tPrice[m]) && parseFloat(tNum[m])){
                tTotal[m] = Util.formatCurrency(  parseFloat(tPrice[m])*parseFloat(tNum[m])) ;
            }else
                tTotal[m] = "0.00"
            this.setState({
                tNum,
                tTotal
            })
        }

    }
    // 新增工种
    addProfession = () =>{
        this.setState({
            professionModalShow:true
        })
    }

    handlerAddProfession =() =>{

    }

    addProfessionInput =(type , e)=>{
        if(type =="name")
            this.setState({
                addProfessionInputValue:{
                  name:Object.assign(type , e.target.value)
                }
            })
        else
            this.setState({
                addProfessionInputValue:{
                    idCard:Object.assign(type , e.target.value)
                }
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

    setWorkerRadio = () =>{

    }

    setWorkerSelect = () =>{

    }

    saveAddWorker = ()=>{
        let addWorkerObj = this.state.addWorkerObj ;
    }

    // 新增工人 end



    closeModal = (param) =>{
        if(param == 0 ){
            this.setState({
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
        window.location.hash= '#/bossBill'
    }
}