import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';

@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            loginError:false,
            userName:"",
            password:""
        }
    }

    render(){
        return(
            <div className="b-login">
                <div className="b-login-box">
                    <h1>欢迎登陆系统</h1>
                    <div className="row mt30">
                        <span>用户名：</span>
                        <input type="text"  value={this.state.userName} placeholder="请输入用户名" onChange={this.setInput.bind(this,0)}/>
                    </div>
                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password"  value={this.state.password} onChange={this.setInput.bind(this,1)}/>

                    </div>
                    <div className="row" >
                        <div className="b-login-box-btn">
                          <Button onClick={this.loginSys}>登陆</Button>
                        </div>
                    </div>
                    {this.state.loginError == true ? (<span className="red">用户名或密码错误</span>):""}

                </div>

            </div>
        )

    }

    setInput =(param,e)=>{
        let val = e.target.value ;
        if(param == 0){
            this.setState({
                userName:val
            })
        }else{
            this.setState({
                password:val
            })
        }
    }

    loginSys =()=>{
        if(this.state.userName !="admin" || this.state.password !="admin"){
            this.setState({
                loginError:true
            })
            return ;
        }
        window.location.hash='#/bossBill'
    }
}