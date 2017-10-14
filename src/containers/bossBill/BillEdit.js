import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';

// 编辑和新增
@observer
export default class BillEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        this.props.router.params.pk
    }

    render(){
        return (
            <div className="content">
                <div className="details_title">{this.props.router.params.pk ?"编辑":"新增"}订单</div>

                <div className="stdreimburse-box">
                    <h3 className="b-title">1、输入订单信息</h3>
                    <div className="row">
                        <div className="col-md-4">合同编号：<input type="text" placeholder="合同编号"/></div>
                        <div className="col-md-4">SKU编号：<input type="text" placeholder="sku编号"/></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
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


    //确定
    submit = ()=>{

    }

    //取消
    exit = ()=>{

    }
}
