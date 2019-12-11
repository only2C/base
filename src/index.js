import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import * as className from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import  'antd-mobile/dist/antd-mobile.css'
import './less'
import $ from 'jquery';
import Config from './config';

import GlobalStore from './stores/GlobalStore';
import App from './containers/App';
import Bundle from './bundle.js';

import MenuContainer from 'bundle-loader?lazy&name=app-[name]!./containers/Menu';
import Redirect from "react-router/es/Redirect";

const Menu  = (props) => (<Bundle load={MenuContainer} {...props}>{ (Page) => <Page {...props} />}</Bundle>)

const requireAuth = (nextState, replace, next) => {
  //切换路由时初始化环境
  GlobalStore.hideAlert();
  // 本地调试环境不进行auth
  if (process.env.NODE_ENV === 'development' || process.env.PROD_SERVER === "1.1.1.1:8888") {
    next();
    return;
  }

}

ReactDom.render(
  <Router history={hashHistory}>
      <Redirect path="/" to="/m" />
      <Route path="/" component={App}>
        <Router path="/m" component={Menu}></Router>
    </Route>
  </Router>,
  document.getElementById('root')
);
