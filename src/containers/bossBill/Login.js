import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';

@observer
export default class Login extends React.Component {

    render(){
        return(
            <div className="b-login">

                <div className="b-login-box">
                    <h1>欢迎登陆系统</h1>
                    <div className="row mt30">
                        <span>用户名：</span>
                        <input type="text"  value="" placeholder="请输入用户名"/>
                    </div>
                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password"  value="" />
                    </div>
                    <div className="row" >
                        <div className="b-login-box-btn">
                          <Button onClick={this.loginSys}>登陆</Button>
                        </div>
                    </div>

                </div>

            </div>
        )

    }

    loginSys =()=>{
        window.location.hash='#/bossBill'
    }
}