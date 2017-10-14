import React from 'react';
import Utils from '../../common/utils';
import {Refers} from 'ssc-refer';
import {Grid} from 'ssc-grid';
import {DatePicker} from 'ssc-grid';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '../../config';
import globalStore from '../../stores/GlobalStore';

export default class BossBillTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1
        }
    }

    componentWillReceiveProps(props){

    }

    render(){
        let that = this ;
        return(
            <div className="stdreimburse-box">
                {this.props.tableData.map((m,n)=>{
                    return(
                        <div className="row mt30 b-body" key={"n"+n}>
                            <div className="col-md-2">
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507971655211&di=26a7363740d513b94ba1925a7342b12e&imgtype=0&src=http%3A%2F%2Fbig5.made-in-china.com%2Fimages%2Fcommon%2Fempty_mid.png"
                                    />
                            </div>
                            <div className="col-md-9 b-body-list">
                                <div className="col-md-3">{m.n0}：{m.v0}</div>
                                <div className="col-md-3">{m.n1}：{m.v1}</div>
                                <div className="col-md-3">{m.n2}：{m.v2}</div>
                                <div className="col-md-3">{m.n3}：{m.v3}</div>
                                <div className="col-md-3">{m.n4}：{m.v4}</div>
                                <div className="col-md-3">{m.n5}：{m.v5}</div>
                                <div className="col-md-3">{m.n6}：{m.v6}</div>
                                <div className="col-md-3">{m.n7}：{m.v7}</div>
                                <div className="col-md-3 red">{m.n7}：{m.v7}<span className="ml10 glyphicon glyphicon-arrow-up"></span></div>
                                <div className="col-md-3 blue">{m.n7}：{m.v7}<span className="ml10 glyphicon glyphicon-arrow-down"></span></div>
                                <div className="col-md-3 red">{m.n7}：{m.v7}</div>
                            </div>
                            <div className="col-md-1">
                                <a className="glyphicon glyphicon-pencil mr15 mt20" title="编辑" href="javascript:;" onClick={that.editBill.bind(this)}></a>
                                <a className="glyphicon glyphicon-trash mt20" title="删除" href="javascript:;" onClick={that.deleteBill.bind(this)}></a>
                            </div>
                        </div>
                    )
                })}

                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={20}
                    maxButtons={5}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />



            </div>
        )
    }

    handleSelect = ()=>{

    }
    // 编辑数据
    editBill = ()=>{

    }

    //删除数据
    deleteBill =(e)=>{

        globalStore.showTipsModal("是否删除","small",()=>{

        })
    }
}