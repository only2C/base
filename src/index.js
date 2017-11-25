import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import * as className from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as reactBootstrap from 'react-bootstrap';
import * as reactDatepicker from 'react-datepicker';
import * as sscGrid from 'ssc-grid';
import * as rcCheckbox from 'rc-checkbox';
import * as rcTree from 'rc-tree';
import * as sscRefer from 'ssc-refer';
import $ from 'jquery';
import Config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'rc-checkbox/assets/index.css'
import 'rc-tree/assets/index.css'
import './less/ybz-index.less';
import GlobalStore from './stores/GlobalStore';
import App from './containers/App';
import Bundle from './bundle.js';


import BossBillContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/BossBill';
import BillEditContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/BillEdit';
import AddMoneyContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/AddMoney';
import LoginContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/Login';
import RegisterContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/Register';
import CreditContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/Credit';
import SettingContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/Setting';
import SalaryContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/Salary';
import BillDetailContainer from 'bundle-loader?lazy&name=app-[name]!./containers/bossBill/BillDetail';

const BossBill  = (props) => (<Bundle load={BossBillContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BillEdit  = (props) => (<Bundle load={BillEditContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BillDetail  = (props) => (<Bundle load={BillDetailContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const AddMoney  = (props) => (<Bundle load={AddMoneyContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Login  = (props) => (<Bundle load={LoginContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Register  = (props) => (<Bundle load={RegisterContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Credit  = (props) => (<Bundle load={CreditContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Setting  = (props) => (<Bundle load={SettingContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Salary  = (props) => (<Bundle load={SalaryContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)

const requireAuth = (nextState, replace, next) => {
  //切换路由时初始化环境
  GlobalStore.hideAlert();
  // 本地调试环境不进行auth
  if (process.env.NODE_ENV === 'development' || process.env.PROD_SERVER === "1.1.1.1:8888") {
    next();
    return;
  }
  //验证权限
  $.ajax({
    type: "GET",
    url: Config.base.islogin,
    success: data => {
      if (data.success) {
        next();
      } else {
        window.location = Config.base.index;
      }
    }
  });
}

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/bossBill/:factoryId" component={BossBill}/>
      <Route path="/billEdit/:pk/:factoryId/:add" component={BillEdit}/> /*编辑订单*/
      <Route path="/billEdit/:pk/:factoryId" component={BillEdit}/> /* 新增订单*/
      <Route path="/addMoney/:pk/:factoryId" component={AddMoney}/> /* 新增收款*/
      <Route path="/billDetail/:pk" component={BillDetail}/> /* 单据详情*/
      <Route path="/login" component={Login}/> /* 登陆 */
      <Route path="/credit" component={Credit}/> /* 贷款*/
      <Route path="/setting" component={Setting}/> /* 设置*/
      <Route path="/salary/:pk/:factoryId" component={Salary}/> /* 计件工资*/
      <Route path="/register" component={Register}/> /* 计件工资*/
    </Route>
  </Router>,
  document.getElementById('root')
);
