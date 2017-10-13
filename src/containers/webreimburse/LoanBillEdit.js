/**
 * @desc   编辑借款单
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
export default class LoanBillEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headerInfo: [],
            tableList: {},
            editTableList:[]
        }
    }

    componentWillMount() {
        this.getHeadInfo();
    }

    //获取表头信息
    getHeadInfo = () => {
        let fields   ;
        store.getLoanBillItemInformation({billType: this.props.params.type});
        store.loadLoanBillBodyTemplateInfo({billTypePk: this.props.params.billTypePk} , ()=>{
            fields  =store.getLoanBillModal ; // 获取所有的字段 ，用来判断编辑态时哪些属于参照
        });
        store.getLoanBillNode({pk: this.props.params.billTypePk} ,()=>{
            let information = store.getLoanInformation;  // 表单头信息
            let tableList = store.getLoanBodyData;   // 表体信息 ，借款单明细列表数据
            _.forEach(information,(m,n)=>{
                // 参照数据转换
                if(m.type == 5 ){
                    if(!m.source_value ||  m.source_value == "null"||  m.source_value == null  ){
                        information[m.source_code] =  [] ;
                        return ;
                    }
                    let result =  m.source_value.split(",");
                    information[m.source_code] = [{id:  result[0] , name:  result[1]}]
                }else
                    information[m.source_code] = m.source_value;
            })

            _.forEach(fields,(m)=>{
                if(m.type == 5 ){
                    _.forEach(tableList,(a,b)=>{
                        let result = a[m.source_code].split(",")
                        a[m.source_code] =  [{id:  result[0] , name:  result[1]}];
                        a.order = new Date().getTime()+b; // 自定义序列号
                    })
                }

            })

            this.setState({
                editTableList:tableList,
                headerInfo:information
            })
        })
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
                <div className="details_title">测试中单据编辑</div>
                <LoanBillHeader headerInfo={this.state.headerInfo} setStateData={this.setStateData}/>
                <LoanBillTable tableInfo={store.getLoanBillModal} tableList={this.state.editTableList}
                               tableHead={store.getTableHead} setStateData={this.setStateData} isEdit={true} />
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
        let tableList = that.state.editTableList;   // 表体信息借款单明细 table
        let codeAll = store.getTableHead.codeAll;  // 自定义属性
        /**
         * 表头数据处理
         * array or object  => string
         * 注意：此处参照不支持多选
         */
        let headData ={};
        let headError = [] ;

        _.forEach(store.getLoanInformation , (m)=>{
            headData[m.source_code] = headList[m.source_code];
            //必输字段校验
            if(m.source_input){
                if( !headList[m.source_code] ||  headList[m.source_code] ==""){
                    headError.push(m.source_name)
                }
            }
            if(typeof headData[m.source_code] == "object"){
                if(JSON.stringify(headData[m.source_code]) =="[]"){
                    let result = _.findIndex(headError,(val)=>{
                        return  val == m.source_name;
                    });
                    if(result < 0){
                        headError.push(m.source_name)
                    }
                    return ;
                }
                headData[m.source_code] =  headList[m.source_code][0].id + "," + headList[m.source_code][0].code
            }
        })

        if(JSON.stringify ( tableList ) == "{}" ||tableList.length ==0  ){
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
            // do something ...
            globalStore.hideAlert();
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
