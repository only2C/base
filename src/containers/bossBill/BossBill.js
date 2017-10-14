import React from 'react';
import {observer} from 'mobx-react';
import {Button} from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import BossBillTableBody from '../../components/bossBill/BossBillTableBody';
import Util from '../../common/utils';
@observer
export default class BossBill extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ // headerList  ==>   type : 0  正常  -1 重点显示 （红色） 1 普通 蓝色
            headerList:[
                {name:'下单数', number:'192',type:0},{name:'总件数', number:'19201',type:0},{name:'接单额', number:'20000',type:0}
                ,{name:'已收款', number:'20000',type:0},{name:'已欠款', number:'20000',type:-1},{name:'逾期款', number:'20000',type:1}
                ,{name:'出货数', number:'200',type:0},{name:'件数差', number:'2000',type:-1},{name:'毛利润', number:'20000',type:-1}
            ],
            bodyData:[
                {n0:"SKU号",v0:'23203',n1:'客户1',v1:'张三','n2':'接件单数',v2:'123',n3:'出货数',v3:'2000',n4:'接件单数',v4:'399',n5:'件数差','v5':'234','n6':'单件布款',v6:'134',n7:'单件辅料',v7:'2000'},
                {n0:"SKU号",v0:'23203',n1:'客户2',v1:'张三','n2':'接件单数',v2:'123',n3:'出货数',v3:'2000',n4:'接件单数',v4:'399',n5:'件数差','v5':'234','n6':'单件布款',v6:'134',n7:'单件辅料',v7:'2000'},
                {n0:"SKU号",v0:'23203',n1:'客户3',v1:'张三','n2':'接件单数',v2:'123',n3:'出货数',v3:'2000',n4:'接件单数',v4:'399',n5:'件数差','v5':'234','n6':'单件布款',v6:'134',n7:'单件辅料',v7:'2000'},
                {n0:"SKU号",v0:'23203',n1:'客户4',v1:'张三','n2':'接件单数',v2:'123',n3:'出货数',v3:'2000',n4:'接件单数',v4:'399',n5:'件数差','v5':'234','n6':'单件布款',v6:'134',n7:'单件辅料',v7:'2000'},
            ]
        }
    }

    render(){
        return (
            <div className="content">
                <div className="details_title">老板利润表</div>
                <div className="stdreimburse-box">
                    <div className="fl">
                       <input type="text" placeholder="请输入SUK编号、合同标号、客户"/>
                       <button>搜索</button>

                        <span>筛选条件。。</span>
                    </div>
                    <div className="fr">
                        <Button bsStyle="warning" className="mr15">新增订单</Button>
                        <Button bsStyle="warning" className="mr15">新增收款</Button>
                        <Button bsStyle="warning" className="mr15">计件工资</Button>
                    </div>
                </div>
                <div className="stdreimburse-box">
                    <div className="row b-header">
                        {this.state.headerList.map((m,n)=>{
                            let cssStyle = "";
                            if(m.type == -1){
                                cssStyle = "red";
                            }else if(m.type == 1){
                                cssStyle = "blue";
                            }
                            return (
                                <div className={ "col-md-4 " +cssStyle}  key={"headerList"+n}>
                                    <b>{m.name}：</b> {Util.formatCurrency(m.number)}
                                </div>
                            )
                        })}

                    </div>
                </div>

                <BossBillTableBody tableData={this.state.bodyData} />

            </div>
        )
    }

}