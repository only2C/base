/**
 * Created by liuyyg on 2017/1/20.
 */
import React from 'react';
import {Link} from 'react-router';
import Config from '../config'

export default class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            tree: {}
        }
    }

    renderNode = (node) => {

    };
    onClickNode = (node) => {
        this.setState({
            active: node
        });
    };
    handleChange = (tree) => {
        this.setState({
            tree: tree
        });
    };

    // 左边栏 上移 下移
    toUp = () => {}
    toDown = () => {}

    render() {
        let _this = this;
        return (
            <section className="sidenav sidenav-container noprint" id="sidenav">

                <div className="sidenav-body">
                    <ul className="nav">
                        <li className="nav-item">
                            <a href="#/mywork">
                                <div className="nav-icon">
                                    <img src="../images/workbanch.png" alt=""/>
                                </div>
                                <div className="nav-text">
                                    <span>工作台</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/voucher.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>账务处理</span>
                            </div>
                            <ul className="menu-child-list">
                                <li>
                                    <a href ={"#/voucher/edit"}>制单</a>
                                </li>
                                <li>
                                    <Link to={"/voucher/list"}>查看凭证</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/books.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>账簿</span>
                            </div>
                            <ul className="menu-child-list">
                                <li>
                                    <Link to={"/account/general"}>总账</Link>
                                </li>
                                <li>
                                    <Link to={"/account/subsidiary"}>明细账</Link>
                                </li>
                                <li>
                                    <Link to={"/account/balance"}>余额表</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/reportform.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>会计报表</span>
                            </div>
                            <ul className="menu-child-list">
                                <li>
                                    <Link to={"/ufoe/balance"}>资产负债表</Link>
                                </li>
                                <li>
                                    <Link to={"/ufoe/income"}>利润表</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/basic-setting.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>基础设置</span>
                            </div>
                            <ul className="menu-child-list">
                                <li>
                                    <Link to={"/setting/account"}>账套设置</Link>
                                </li>
                                <li>
                                    <Link to={"/setting/print"}>打印设置</Link>
                                </li>
                                <li>
                                    <Link to={"/setting/accsubject"}>会计科目</Link>
                                </li>
                                <li>
                                    <Link to={"/setting/remark"}>摘要</Link>
                                </li>
                                <li>
                                    <Link to={"/setting/multidimension"}>辅助核算项</Link>
                                </li>
                                <li>
                                    <Link to={"/setting/subjectchart"}>科目表</Link>
                                </li>
                                {
                                    process.env.PROD_SERVER==="10.3.14.238"?
                                        "":<li>
                                        <Link to={"/setting/AccountBookList"}>账套设置第二版</Link>
                                    </li>
                                }

                            </ul>
                        </li>
                            <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/basic-file.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>基础档案</span>
                            </div>
                            <ul className="menu-child-list">
                                <li>
                                    <Link to={"/basedoc/trader"}>客商</Link>
                                </li>
                                <li>
                                    <Link to={"/basedoc/dept"}>部门</Link>
                                </li>
                                <li>
                                    <Link to={"/basedoc/project"}>项目</Link>
                                </li>
                                <li>
                                    <Link to={"/basedoc/projectclass"}>项目分类</Link>
                                </li>
                                <li>
                                    <a href={"#/setting/ifr/"+encodeURIComponent("http://uastest.yyuap.com/org/login.jsp?tenantId=ysdzxt76&sysId=yonyoufi&operatorCode=admin&orgType=fin_org&userId=admin")} target="" >组织</a>
                                </li>
                                <li>
                                    <a href={"#/setting/ifr/"+encodeURIComponent("http://uastest.yyuap.com/org/login.jsp?tenantId=ysdzxt76&sysId=yonyoufi&operatorCode=admin&orgType=department&userId=admin")} target="" >部门</a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/financial-platform.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>财务平台</span>
                            </div>
                            <ul className="menu-child-list">
                                    <li>
                                    <Link to={"/setting/contrastnew"}>基础数据映射</Link>
                                    </li>
                                <li>{
                                    process.env.PROD_SERVER=="10.3.14.238"?
                                    <a href={"#/setting/ifr/"+encodeURIComponent("http://10.3.14.238/exchanger/20170512/index.html#/zhuan-huan-mo-ban")} target="" >平台接入配置</a>:
                                    <a href={"#/setting/ifr/"+encodeURIComponent("http://share.yyssc.org:1234/pub/personal/chenyang/yzb/yzb.yyssc.org/exchanger/20170512/#/zhuan-huan-mo-ban")} target="" >平台接入配置</a>
                                    }
                                    </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-icon">
                                <img src="../images/reportform.png" alt=""/>
                            </div>
                            <div className="nav-text">
                                <span>结转结账</span>
                            </div>
                            <ul className="menu-child-list">
                                        <li>
                                            <Link to={"/balance"}>期初余额</Link>
                                        </li>
                                <li>
                                        <Link to={"/checkout"}>结账</Link>
                                    </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {
                    /*<div className="sidenav-scroll-btn">
                     <div className="up-btn" onClick={_this.toUp.bind(this)}>
                     <i className="glyphicon glyphicon-menu-up"></i>
                     </div>
                     <div className="down-btn" onClick={_this.toDown.bind(this)}>
                     <i className="glyphicon glyphicon-menu-down"></i>
                     </div>
                     </div>*/
                }
            </section>
        );
    }
};
