/**
 * @desc   借款单表体
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker} from 'ssc-grid';
import {Modal, Button} from 'react-bootstrap'
import _ from 'lodash';
import Config from '../../config';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
const store = new WebreImburseStore();
export default class LoanBillTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableInfo: [],  // Modal中 表格绘制
            tableHead: [],  // 页面下方列表的表头信息  自定义的内容
            tableList:[],   // Modal 新增的时候，点保存，数据存放的容器
            tableListShow:[], // 页面借款列表展示内容
            modalShow: false,   // Modal 展示/隐藏 继承bootstrap
            saveTableList:[],
            modalErrors:[] , //modal 填单，错误信息集合
            errorModalTips:"",

        }
    }

    componentWillReceiveProps(props){
        this.setState({
            tableInfo: props.tableInfo,
            tableList: props.tableList,
            tableHead: props.tableHead
        })
    }

    componentWillMount() {
    }

    getMoney = () =>{
        let isEdit = this.props.isEdit ;
        let tableListShow = this.state.tableListShow;
        if(isEdit){
            tableListShow =this.props.tableList
        }
        let total = 0 ;
        _.forEach(tableListShow,(item)=>{
            total += parseFloat(item.money)
        })
        return total  ;
    }

    render() {
        return (
            <div style={{marginBottom:'60px'}}>
                <div className="stdreimburse-box">
                    <b>明细：共{Utils.formatCurrency(this.getMoney())}</b>
                    <button type="button" onClick={this.openModal} className='btn btn-primary fr'>新增</button>
                </div>

                <div className={ ( this.state.tableListShow.length>0 || this.props.isEdit) ? "details_table":"hide"}>
                    {/* <div className="row details_table_t">次，金额：￥   </div>*/}
                    <div className="standard-grid">
                        {this.initGrid()}
                    </div>
                </div>

                <Modal show={this.state.modalShow} onHide={this.closeModal} className="static-modal">
                    <Modal.Header closeButton={true}>
                        <Modal.Title >填写借款单</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{overflow:'auto'}}>
                        {this.initModalGrid()}
                         <span className={this.state.modalErrors.length> 0 ? "error": "hide"}>
                            {this.state.modalErrors.map((m,n)=>{
                                    return(
                                       n==0 ? m : ("、"+m)
                                    )
                            })}
                        不可为空</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>取消</Button>
                        <Button onClick={this.saveModal} bsStyle="primary">确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    initGrid = ()=> {
        let isEdit = this.props.isEdit ;
        let tableListShow = this.state.tableListShow;
        if(isEdit){
           tableListShow =this.props.tableList
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    {this.state.tableHead && this.state.tableHead.name && this.state.tableHead.name.map((item, index)=> {
                        return (
                            <th key={'tableHead'+index}>{item}</th>
                        )
                    })}
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {tableListShow.map( ( a , b )=>{
                    return (
                        <tr key={"tableList"+b}>
                            <td>{b+1}</td>
                            {this.state.tableHead.code.map((m , n )=>{
                                if(typeof a[m] == 'object'){
                                    return (
                                        <td key={"tableMap"+m}>
                                            {
                                                a[m].map((y,z)=>{
                                                    return(
                                                        <td key={"tableMap"+m}>{y.name}</td>
                                                    )
                                                })
                                            }
                                        </td>
                                    )

                                }else{
                                    return (
                                        <td key={"tableMap"+m}>{m=="money" ?Utils.formatCurrency(a[m]):a[m]}</td>
                                    )
                                }

                            })}
                            <td>
                                <span onClick={this.editLoan.bind(this,a.order)}>编辑</span>
                                <span onClick={this.deleteLoan.bind(this,a.order)}>删除</span>
                            </td>
                        </tr>)
                })}
                </tbody>
            </table>
        )
    }


    initModalGrid = ()=> {
        let inputStyle = {
            width: '100%',
            border: 0,
            outline: 'none',
            lineHeight: '30px'
        }
        let inputError= {
            border:'1px solid red',
            height:'35px'
        }
        return (
            <div className="row">
                {this.props.tableInfo.map((item, index)=> {
                    return (
                        <div key={'LoanBill'+index} className='col-md-4 col-sm-4 col-xs-4 details-h'
                             style={{height:'60px'}}>
                            <div className="details-h-t">{item.display =="true"  ? (<span className='error'>*</span>):""}   {item.source_name}</div>
                            {item.type == 5 ? (
                                <Refers
                                    key={Math.random()}
                                    labelKey={item.typeTwo==3 ? 'code': 'name'}
                                    emptyLabel='暂无数据'
                                    onChange={this.referHandleChange.bind(this,item.source_code)}
                                    placeholder="请选择..."
                                    referConditions={{"refType":"table","refCode":(item.source_type==1530 || item.source_type==1520) ? '个人银行账户' :item.dest_property_name,"rootName":item.source_name,"displayFields":["id","name"]}}
                                    referDataUrl={Config.webreimburse.webReferUrl}
                                    referType="list"
                                    selected={this.props.tableInfo[item.source_code] ? this.props.tableInfo[item.source_code] : []}
                                    ref={ref => this._myrefers = ref}
                                    multiple={false}/>
                            ) : ""}

                            {item.type == 4 ? (
                                <div className="details-h-v" style={{height:'35px'}}>
                                    <label>
                                        <input type="radio" checked={this.props.tableInfo[item.source_code]===false}
                                               onClick={this.radioInputChange.bind(this,item.source_code,false)}
                                               value={false}/> 否
                                    </label>
                                </div>
                            ) : ''}
                            {item.type == 3 ? (
                                <DatePicker id="example-datepicker"
                                            dateFormat="YYYY-MM-DD"
                                            value={this.props.tableInfo[item.source_code] ? this.props.tableInfo[item.source_code] : Utils.getTime()}
                                            onChange={this.getTime.bind(this,item.source_code)}/>

                            ) : ''}
                            {item.type == 2 ? (
                                item.source_code == "money" ? (
                                    <div className="details-h-v" style={this.state.errorModalTips ? inputError : {height:'35px'}}>
                                        <label>
                                            <input style={inputStyle}   value={this.props.tableInfo[item.source_code]?this.props.tableInfo[item.source_code]:''}
                                                   onChange={this.inputChange.bind(this,item.source_code)} onKeyUp={this.inputValidate.bind(this,item.source_code)}/>
                                        </label>
                                    </div>
                                ):(
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <label>
                                            <input style={inputStyle}   value={this.props.tableInfo[item.source_code]?this.props.tableInfo[item.source_code]:''}
                                                   onChange={this.inputChange.bind(this,item.source_code)} />
                                        </label>
                                    </div>
                                )

                            ) : ''}
                            {item.type == 1 || item.type == 0 ? (
                                <div className="details-h-v" style={{height:'35px'}}>
                                    <input style={inputStyle}
                                           value={this.props.tableInfo[item.source_code]?this.props.tableInfo[item.source_code]:''}
                                           onChange={this.inputChange.bind(this,item.source_code)} type="text"/>
                                </div>
                            ) : ''}
                        </div>
                    )
                })}
            </div>
        )

    }

    //参照选择
    referHandleChange(type, item) {
        let tableInfo = this.props.tableInfo;
        tableInfo[type] = item;
        this.props.setStateData({tableInfo:tableInfo})
    }

    radioInputChange(type, value) {
        let tableInfo = this.props.tableInfo;
        tableInfo[type] = value;
        this.props.setStateData({tableInfo:tableInfo})
    }

    inputChange(type, event) {
        let tableInfo = this.props.tableInfo;
        let el = event.target.value ;
        tableInfo[type] = el ;
        this.props.setStateData({tableInfo:tableInfo})
    }

    inputValidate(type, event){
        let that = this;
        let tableInfo = that.props.tableInfo;
        tableInfo[type] = event.target.value;
        let tips = store.validateMoney( event.target.value );
        this.setState({
            errorModalTips:tips
        })
        // that.props.setStateData({errorModalTips:tips})
    }
    getTime(type, value) {
        let tableInfo = this.props.tableInfo;
        tableInfo[type] = value;
        this.props.setStateData({tableInfo:tableInfo})
    }

    // 新增表单
    openModal = ()=> {
        let tableInfo = this.state.tableInfo,
            tableHead = this.state.tableHead ,
            tableList = this.state.tableList;

        _.forEach(tableHead.codeAll,(m,n)=>{
            tableInfo[m] = '';
            delete tableList[m];
        })
        this.setState({
            tableList,
            tableInfo,
            modalErrors:[],
            modalShow: true
        })
    }

    closeModal = ()=> {
        this.setState({
            modalErrors:[],
            modalShow: false
        })
    }

    saveModal = ()=> {
        let isEdit = this.props.isEdit ;
        let tableListShow = this.state.tableListShow;
        if(isEdit){
            tableListShow =this.props.tableList
        }
        let tableInfo = this.state.tableInfo ;
        let codeAll = this.state.tableHead.codeAll ;
        let order = tableInfo.order || '';

        //错误消息集合
        let tips = this.tableMustInputTips(tableInfo);
        if(tips.length > 0 ){
            return ;
        }


        let obj ={} ;
        _.forEach(codeAll,(m,n)=>{
            obj[m] = tableInfo[m];
        });

        if(order){  //  order(序号) 存在，表明是处于编辑状态
            let index = _.findIndex(tableListShow,(value)=>{
                return value.order == order ;
            })
            obj.order = order ;
            tableListShow[index] = obj
        }else{
            obj.order = new Date().getTime();
            tableListShow.push(obj);
        }

        this.setState({
            modalErrors:[],
            modalShow:false,
            tableListShow:tableListShow
        },()=>{
            this.props.setStateData({tableList:tableListShow})
        })



    }

    // 删除单据
    deleteLoan =(id)=>{
        let isEdit = this.props.isEdit ;
        let tableListShow = this.state.tableListShow;
        if(isEdit){
            tableListShow =this.props.tableList
        }

        for(let i=0 ; i<tableListShow.length ; i++){
            if(tableListShow[i].order == id ){
                tableListShow.splice(i , 1 );
                break;
            }
        }

        this.setState({
            tableListShow
        },()=>{
            this.props.setStateData({tableList:tableListShow})
        })



    }

    // 编辑单据
    editLoan = (id)=>{
        let isEdit = this.props.isEdit ;
        let tableListShow = this.state.tableListShow;
        if(isEdit){
            tableListShow =this.props.tableList
        }

        let codeAll = this.state.tableHead.codeAll ;
        let tableInfo = this.state.tableInfo ;

        _.forEach(tableListShow,(m,n)=>{
            _.forEach(codeAll , (a,b )=>{
                if(m.order && m.order == id ){
                    tableInfo.order =id ;
                    tableInfo[a] = tableListShow[n][a]
                }
            })
        })

        this.setState({
            tableInfo,
            modalShow:true
        },()=>{
            this.props.setStateData({tableList:tableListShow})
        })

    }

    /**
     * 判断 Modal 新增数据是否为空，哪些是必输字段
     */
    tableMustInputTips = (param) =>{
        let mustInput = this.state.tableHead.mustInput ;
        let modalErrors  = [];

        _.forEach(mustInput,(m,n)=>{
            if( param[m.mustCode] =="" ){
                modalErrors.push(m.mustName);
            }
        })

        // 金额校验问题
        if(this.state.errorModalTips !=""){
            modalErrors.push("金额格式不正确或")
        }

        this.setState({
            modalErrors
        })
        return modalErrors ;

    }

}