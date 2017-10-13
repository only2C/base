/**
 * @desc   查看详情借款单表头
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import Utils from '../../common/utils';
import {observer} from 'mobx-react';
import {Refers} from 'ssc-refer';
import {DatePicker} from 'ssc-grid';
import Config from '../../config';
@observer
export default class LoanBillHeader extends React.Component {

    render() {
        let headerInfo = this.props.headerInfo || [];
        let that = this ;
        let inputStyle = {
            width: '100%',
            border: 0,
            outline: 'none',
            lineHeight: '30px'
        }

        return (
            <div className="stdreimburse-box">
                <div className="row">
                    { headerInfo.map((item, index)=> {
                        return (
                            <div key={'LoanBill'+index} className='col-md-4 col-sm-4 col-xs-4 details-h'
                                 style={{height:'60px'}}>
                                <div className="details-h-t">{item.source_name}</div>
                                {item.type == 5 ? (
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <input style={inputStyle}  value= { item.source_value.split(",")[1] ? item.source_value.split(",")[1] : "暂无数据"}    type="text"/>
                                     </div>
                                ) : ""}

                                {item.type == 4 ? (
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <label>
                                            <input type="radio"
                                                   checked={item.source_value===false}
                                                   value={false}/> 否
                                        </label>
                                    </div>
                                ) : ''}

                                {item.type == 1 || item.type == 0  || item.type == 2||item.type == 3  ? (
                                    <div className="details-h-v" style={{height:'35px'}}>
                                        <input style={inputStyle}  value={item.source_value?item.source_value:""}   type="text"/>
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