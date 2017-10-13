/**
 * @desc   查看详情借款单表体
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker} from 'ssc-grid';
import {Modal, Button} from 'react-bootstrap';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
import {observer} from 'mobx-react';
import _ from 'lodash';
import Config from '../../config';
const store = new WebreImburseStore();
@observer
export default class LoanBillTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableInfo: [],  // Modal中 表格绘制
            tableHead: [],  // 页面下方列表的表头信息  自定义的内容
            tableList:[],   // Modal 新增的时候，点保存，数据存放的容器
            tableListShow:[], // 页面借款列表展示内容
        }
    }

    componentWillMount() {
        this.setState({
            tableInfo: this.props.tableInfo,
            tableList: this.props.tableList,
            tableHead:this.props.tableHead
        })
    }

    getMoney =()=>{
        let total = 0 ;
        this.props.tableBodyData.map((item)=>{
            total += item.money ;
        })
        return total ;
    }

    render() {
        return (
            <div style={{marginBottom:'60px'}}>
                <div className="stdreimburse-box">
                    <b>明细：共{Utils.formatCurrency(this.getMoney())}</b>
                </div>

                <div className={"details_table"}>
                    {/* <div className="row details_table_t">次，金额：￥   </div>*/}
                    <div className="standard-grid">
                        {this.initGrid()}
                    </div>
                </div>
            </div>
        )
    }

    initGrid = ()=> {
        return (
            <table className="table" id="loanTable">
                <thead>
                <tr>
                    <th></th>
                    {this.props.tableHead&&this.props.tableHead.name && this.props.tableHead.name.map((item, index)=> {
                        return (
                            <th key={'tableHead'+index}>{item}</th>
                        )
                    })}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.props.tableBodyData.map((a,b)=>{
                        return (
                            <tr key={"tableBodyTr"+b}>
                                <td>{b+1}</td>
                                {this.props.tableHead && this.props.tableHead.codeObj && this.props.tableHead.codeObj.map((m,n)=>{
                                    if(m.sourceType == "5"){
                                        return(
                                            <td key={"tableBodyTd"+n}>{a[m.sourceCode].split(",")[1]}</td>
                                        )
                                    }else{
                                        return(
                                            <td key={"tableBodyTd"+n}>{a[m.sourceCode]}</td>
                                        )
                                    }
                                })}
                                <td>
                                    <span onClick={this.getRowsDetail.bind(this,a.loanbillPk , a.pk ,b,this.props.tableHead.code.length )}>查看详情</span>
                                </td>
                             </tr>)
                    })}
                </tbody>
            </table>
        )
    }

    // 查看单行数据详情
    // 语法  jquery  小学生版本  暂时没有想到react相关解决方案，留着后期优化
    getRowsDetail =(pk1,pk2,rowIndex,colsLength , e )=>{
        e.stopPropagation() ;
        let target =  $(e.currentTarget).parents("tr") ;
        let param ={
            "billTypePk":pk1,
            "jkBodyPk":pk2
        };
        let insertDomIndex = "insertDom" + rowIndex  ;
        if($('#' +insertDomIndex).length>0){
            return false ;
        }

        store.getLoanBillBodyInfo(param , ()=>{
            let rows = store.getRowsDetail ;
            let dom ="<tr style='background: #cfcfcf'><td colspan="+ (colsLength+1 )+ "" +
                " id='"+ insertDomIndex + "'  class='insetDomRows'><div class='row' >";
            rows.map((item)=>{
                dom+= '<div class="col-md-6">' +
                        '<div class="col-md-6"><span class="fr">'+item.source_name+ '：</span></div>' +
                        '<div class="col-md-6">' + item.source_value+'</div>' +
                     '</div>';
            });
            dom +=  "</div></td><td id='hideRows"+ insertDomIndex +"'><span>收起</span></td></tr>"
            target.after(dom) ;
            $("#hideRows"+insertDomIndex).on("click",function(event){
                event.stopPropagation() ;
                let rowsTarget = $( event.target) ;
                rowsTarget.parents("tr").remove() ;
            })
        })

    }
}