import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';

// 贷款
@observer
export default class Credit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active:0
        };
    }
    render(){
        return (
            <div className="content mt50">
                <Nav navIndex="1"/>
                <div className="stdreimburse-box">
                    <div className="row b-credit">
                        <div className="b-credit-img fl">
                            <img src="http://admin.liuhangwantong.com/uploads/c5582e5638f8f436dbc3cba28d31de9f1487647386.jpg"/>
                        </div>
                        <div className="b-credit-intro fl">
                            <h3>辛巴达 工厂贷</h3>
                            <p>一次抵押，循环使用，随借随还，方便快捷</p>
                            <p>已申请人数 <span className="red">123456</span>人</p>
                        </div>
                        <div className="b-credit-title fr">
                             <div className="b-credit-title-box fl">
                                 <span>借款金额</span>
                                 <p>1000<span>元</span></p>
                             </div>
                            <div  className="b-credit-title-box fr">
                                <span>借款期限</span>
                                <p>365<span>天</span></p>
                            </div>
                            <div className="b-credit-title-detail">
                                <div className="b-credit-t-box fl">
                                    <h5>日还款</h5>
                                    <p>5.00 <span> 元</span></p>
                                </div>
                                <div className="b-credit-t-box fl">
                                    <h5>参考日息</h5>
                                    <p>0.02 <span>%</span></p>
                                </div>
                                <div className="b-credit-t-box fl">
                                    <h5>最快放宽时间</h5>
                                    <p>2<span>天</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stdreimburse-box">
                    <div className="b-credit-detail">
                        <ul className="b-credit-detail-title">
                            <li className={this.state.active == 0? "active":""} onClick={this.changeTab.bind(this,0)}>产品详情</li>
                            <li className={this.state.active == 1? "active":""} onClick={this.changeTab.bind(this,1)}>产品评价</li>
                        </ul>
                    </div>
                    <div className="b-credit-change">
                        <div className={this.state.active == 0? "b-credit-change-box":"hide"}>
                            <p>产品介绍</p>

                            <span>中信银行房屋抵押消费贷款额度高>中信银行房屋抵押消费贷款额度高：最高可达抵押房产价值的70%； 一次抵押，循环使用，随借随还，方便快捷。</span>

                            <p>申请条件</p>

                            <span>房屋的产权要明晰，符合国家规定的上市交易的条件，可进入房地产市场流通，未做任何其他抵押；</span>
                            <span>房龄（从房屋竣工日起计算）与贷款年限相加不能超过20年；</span>
                            <span>所抵押房屋未列入当地城市改造拆迁规划，并有房产部门、土地管理部门核发的房产证和土地证；</span>

                            <p>所需材料</p>

                            <span>借款人贷前填写居民住房抵押申请书，并提交银行下列证明材料：借示人所在单位出具的借款人固定经济收入证明；</span>
                            <span>借款担保人的营业执照和法人证明等资信证明文件；</span>
                            <span>借款人具有法律效力的身份证明；</span>
                            <span>符合法律规定的有关住房所有权证件或本人有权支配住房的证明；</span>
                            <span>抵押房产的估价报告书、鉴定书和保险单据；购建住房的合同、协议或其他证明文件；</span>
                            <span>贷款银行要求提供的其他文件或材料。</span>
                            <span>银行对借款人的贷款申请、购房合同、协议及有关材料进行审查。</span>
                            <span>借款人将抵押房产的产权证书及保险单或有价证券交银行收押。</span>
                            <span>借贷双方担保人签订住房抵押贷款合同并进行公证。</span>
                        </div>
                        <div className={this.state.active == 1? "b-credit-change-box":"hide"}>
                            好评！
                        </div>
                    </div>

                    <div className="row b-center">
                        <Button bsStyle="warning">马上贷款</Button>
                    </div>

                </div>

                <div className="btn-bottom-fixed">
                    <div className="row btn-bottom">
                        <div className="col-sm-12">
                            <button type="button" className='btn btn-primary fr' onClick={this.exit}>返回</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }


    changeTab =( param )=>{
        this.setState({
            active:param
        })
    }

    //取消
    exit = ()=>{
        window.history.back(-1);
    }
}