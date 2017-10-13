/**
 * @desc   新增借款单
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
import LoanBillHeader from '../../components/webreimburse/LoanBillHeader';
import LoanBillTable from '../../components/webreimburse/LoanBillTable';
const store = new WebreImburseStore();
@observer
export default class LoanBill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headerInfo: {},
            tableList: {}
        }
    }

    componentWillMount() {
        this.getHeadInfo();
    }

    //获取表头信息
    getHeadInfo = () => {
        store.getLoanBillItemInformation({billType:this.props.params.type});
        store.loadLoanBillBodyTemplateInfo({billTypePk: this.props.params.billTypePk});
    }

    setStateData = (data, callback) => {
        this.setState(data, ()=> {
            if (typeof callback == 'function')
                callback();
        })
    }

    render() {
        return (
            <div className="content">
                <div className="details_title">测试中</div>
                <LoanBillHeader headerInfo={store.getLoanBillItemInformationData} setStateData={this.setStateData}/>
                <LoanBillTable tableInfo={store.getLoanBillModal} tableList={ store.getLoanBillTable}
                               tableHead={store.getTableHead} setStateData={this.setStateData}/>
                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.submit}>确定</button>
                            <button type="button" className='btn btn-default fr' onClick={this.exit}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 单据提交
    submit = () => {
        let that = this;
        let headList = that.state.headerInfo;   // 表头信息
        let tableList = that.state.tableList;   // 表体信息借款单明细 table
        let codeAll = store.getTableHead.codeAll;  // 自定义属性
        /**
         * 表头数据处理
         * array or object  => string
         * 注意：此处参照不支持多选
         */
        let headData ={};
        let headError = [] ;
        _.forEach( store.getLoanBillItemInformationData , (m,n)=>{
            headData[m.source_code] = headList[m.source_code];
            //必输字段校验
            if(m.source_input){
                if( !headList[m.source_code] ||  headList[m.source_code] ==""){
                   headError.push(m.source_name)
                }
            }
            if(typeof headData[m.source_code] == "object"){
                headData[m.source_code] =  headList[m.source_code][0].id + "," + headList[m.source_code][0].code
            }
        })

        /**
         * 表体数据处理
         * 参照 数据转换  array => string
         * 注意：此处参照不支持多选
         **/
        _.forEach(tableList, (a, b)=> {
            _.forEach(codeAll, (m, n)=> {
                if (typeof a[m] == "object") {
                    let result = a[m][0].id + "," + a[m][0].code;
                    a[m] = result;
                }
            })
        })
        if(JSON.stringify ( tableList ) == "{}" ){
            headError.push("表体明细")
        }

        if(this.state.errorTips !=""){
            headError.push("金额格式不正确或")
        }

        if(headError.length > 0){
            let message = "";
            _.forEach(headError,(item , index )=>{
                index == 0 ? ( message=item):( message += "、"+item);
            })
            message += "字段不可为空"
            globalStore.showError(message)
            return ;
        }


        let param = {
            "billTypeInformation": {
                "billType": that.props.params.billTypePk
            },
            "information":headData,
            "bodyInformation": {
                "jk_body": tableList
            },
            "otherInformation": store.getLoanBillItemOtherInformation,
            "applyBillInformation": {
                "sqdpks": [{}, {}]
            }
        };
        store.saveLoanBillNode(param, ()=> {
            globalStore.hideAlert();
            // do something ...
            let msg =  "保存成功！"
            globalStore.showTipsModal(msg,"small","",
                ()=>{
                    // completed
                })
        })

    }

    // 取消
    exit = ()=> {

    }
}
