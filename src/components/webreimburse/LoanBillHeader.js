/**
 * @desc   借款单表头
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {DatePicker} from 'ssc-grid';
import {observer} from 'mobx-react';
import Config from '../../config';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
const store = new WebreImburseStore();
@observer
export default class LoanBillHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headerInfo: [],
            errorTips:''
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            headerInfo:props.headerInfo
        })
    }

    //参照选择
    referHandleChange(type, item) {
        let that = this;
        let headerInfo = that.props.headerInfo;
        headerInfo[type] = item;
        that.props.setStateData({headerInfo: headerInfo})
    }

    radioInputChange(type, value) {
        let that = this;
        let headerInfo = that.props.headerInfo;
        headerInfo[type] = value;
        that.props.setStateData({headerInfo: headerInfo})
    }

    inputChange(type, event) {
        let that = this;
        let headerInfo = that.props.headerInfo;
        headerInfo[type] = event.target.value;
        that.props.setStateData({headerInfo: headerInfo})
    }

    inputValidate(type, event){
        let that = this;
        let headerInfo = that.props.headerInfo;
        headerInfo[type] = event.target.value;
        let tips = store.validateMoney( event.target.value );
        this.setState({
            errorTips:tips
        })
        that.props.setStateData({errorTips:tips})
    }

    getTime(type, value) {
        let that = this;
        let headerInfo = that.props.headerInfo;
        headerInfo[type] = value;
        that.props.setStateData({headerInfo: headerInfo})
    }

    render() {
        let inputStyle = {
            width: '100%',
            border: 0,
            outline: 'none',
            lineHeight: '30px'
        };
        let inputError= {
            border:'1px solid red',
            height:'35px'
        }
        return (
            <div className="stdreimburse-box">
                <div className="row">
                    {  this.props.headerInfo.map((item, index)=> {
                        return (
                            <div key={'LoanBill'+index} className='col-md-4 col-sm-4 col-xs-4 details-h'
                                 style={{height:'60px'}}>
                                <div className="details-h-t">{item.source_name}</div>
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
                                        selected={this.props.headerInfo[item.source_code]?this.props.headerInfo[item.source_code]:[]}
                                        ref={ref => this._myrefers = ref}
                                        multiple={false}/>
                                ) : ""}

                                {item.type == 4 ? (
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <label>
                                            <input type="radio"
                                                   checked={this.props.headerInfo[item.source_code]===false}
                                                   onClick={this.radioInputChange.bind(this,item.source_code,false)}
                                                   value={false}/> 否
                                        </label>
                                    </div>
                                ) : ''}
                                {item.type == 3 ? (
                                    <DatePicker id="example-datepicker"
                                                dateFormat="YYYY-MM-DD"
                                                value={this.props.headerInfo[item.source_code] ? this.props.headerInfo[item.source_code] :""}
                                                onChange={this.getTime.bind(this,item.source_code)}/>

                                ) : ''}
                                {item.type == 2 ? (
                                    item.source_code == "money" ?
                                        (
                                            <div className="details-h-v" style={this.state.errorTips ? inputError : {height:'35px'}}>
                                                <label >
                                                    <input style={inputStyle } value={this.props.headerInfo[item.source_code]?this.props.headerInfo[item.source_code]:''}
                                                        onChange={this.inputChange.bind(this,item.source_code)} onKeyUp={this.inputValidate.bind(this,item.source_code)}/>
                                                </label>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="details-h-v" style={{height:'35px'}}>
                                                <label>
                                                    <input style={inputStyle}
                                                         value={this.props.headerInfo[item.source_code]?this.props.headerInfo[item.source_code]:''}
                                                         onChange={this.inputChange.bind(this,item.source_code)}/>
                                                </label>
                                            </div>
                                        )
                                ) : ''}
                                {item.type == 1 || item.type == 0 ? (
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <input style={inputStyle}
                                               value={this.props.headerInfo[item.source_code]?this.props.headerInfo[item.source_code]:''}
                                               onChange={this.inputChange.bind(this,item.source_code)} type="text"/>
                                    </div>
                                ) : ''}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}