/**
 * @desc   查看借款单详情
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
import LoanBillHeaderDetail from '../../components/webreimburse/LoanBillHeaderDetail';
import LoanBillTableDetail from '../../components/webreimburse/LoanBillTableDetail';
const store = new WebreImburseStore();
@observer
export default class LoanBill extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      headerInfo:[],
      tableInfo:[],
      tableList:{},
      tableHead:{}
    }
  }
  componentWillMount(){
    this.getBillDetail() ;
  }

  getBillDetail = ()=>{
    store.getLoanBillNode({pk:this.props.params.pk});
    store.loadLoanBillBodyTemplateInfo();
  }

  setStateData = (data,callback) =>{
    this.setState(data,()=>{
      if(typeof callback == 'function')
          callback();
    })
  }

  render(){
    return (
      <div className="content" >
        <div className="details_title">测试中...</div>
        <LoanBillHeaderDetail headerInfo={store.getLoanInformation}/>
        <LoanBillTableDetail tableBodyData= {store.getLoanBodyData}  tableHead = {store.getTableHead} />
        <div className= "btn-bottom-fixed">
          <div className="row btn-bottom">
            <div className="col-sm-12">
              <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
            </div>
          </div>
        </div>

      </div>

    )
  }

  // 取消
  exit =()=>{

  }
}
