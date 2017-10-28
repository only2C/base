import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import billStore from '../../stores/bossBill/BossBillStore';
const store = new billStore();
@observer
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            login:{},
            validateList:["userName",'email','idCard','password','password1']
        }
    }

    componentWillMount =()=>{
        $("#root").addClass("b-login")
    }

    setInput = (i , e ) =>{
        let el = e.target.value ;
        let login = this.state.login ;
        login[i] = $.trim(el) ;
        login[i+"Error"] = false;
        this.setState({
            login
        })
    }

    validatePassword = () =>{
        let login = this.state.login ;
        if(login["password2"] != login["password"]){
            login["passwordError"] = true ;
        }else{
            login["passwordError"] = false ;
        }
        this.setState({
            login
        })
    }

    validateEmail = () =>{
        let login = this.state.login ;
        let reg =  /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(login['email'] =="" || reg.test(login['email'])){
            login['emailError'] = false ;
        }else{
            login['emailError'] = "格式不正确，例如a@email.com";
        }
        this.setState({
            login
        })
    }
    isExitedEmail =() =>{
        let login = this.state.login ;
        store.userExsisted({'email':login['email']});
        if(!store.userExsistedResult &&  login['emailError'] ==""){
            login['emailError'] = "邮箱已存在！";
        }

        this.setState({
            login
        })
    }

    registUser =()=>{
        let login = this.state.login;
        let validateList = this.state.validateList;
        let result = false ;
        validateList.forEach((m,n)=>{
            if(!login[m] || login[m] == ""){
                let mError = m + "Error";
                login[mError] = true;
                result= true
            }
        })

        this.setState({
            login
        })

        if(result){
            return ;
        }


        let param = {
            name:login['userName'],
            pwd:login['password'],
            pwd1:login['password1'],
            idCard:login['idCard'],
            email:login['email']
        };
        store.userReg(param,()=>{
            globalStore.showTipsModal("恭喜您" + login['userName'] + "注册成功！" ,"small","",()=>{
                window.location.hash ='#/login';
            } )
        })


    }

    render(){
        let login = this.state.login ;
        return (
            <div className="b-login">
                <div className="b-login-box">
                    <h1>欢迎注册系统</h1>
                    <div className="row mt30">
                        <span>用户名：</span>
                        <input type="text"  className={login['userNameError'] ? "input-error b-input" : "b-input" }
                               value={login["userName"]} placeholder="请输入用户名" onChange={this.setInput.bind(this,"userName")}/>
                    </div>
                    <div className="row mt30">
                        <span>邮箱名：</span>
                        <input type="text" className={login['emailError'] ? "input-error b-input" : "b-input" }  value={login["email"]} placeholder="请输入邮箱" onChange={this.setInput.bind(this,"email")}
                               onKeyUp={this.validateEmail} onBlur={this.isExitedEmail}/>
                        {login["emailError"] ? (
                            <span className="b-regist-error" style={{width:"300px"}}>{login["emailError"]}</span>
                        ):"" }
                    </div>
                    <div className="row mt30">
                        <span>身份证号：</span>
                        <input type="text"  className={login['idCardError'] ? "input-error b-input" : "b-input" }   value={login["idCard"]} placeholder="请输入身份证号" onChange={this.setInput.bind(this,"idCard")}/>
                    </div>
                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password"  className={login['passwordError'] ? "input-error b-input" : "b-input" }   value={login["password"]} onChange={this.setInput.bind(this,"password")}/>
                    </div>
                    <div className="row mt30">
                        <span>确认密码:</span>
                        <input type="password"  value={login["password2"]}  className={login['passwordError'] ? "input-error b-input" : "b-input" }  onChange={this.setInput.bind(this,"password2")} onKeyUp={this.validatePassword}/>
                        {login["passwordError"] ? (
                            <span className="b-regist-error" style={{width:"300px"}}>两次输入的密码不一样</span>
                        ):"" }
                    </div>
                    <div className="row" >
                        <div className="b-regist-box-btn">
                            <Button onClick={this.registUser} bsStyle="info">注册</Button>
                        </div>
                        <p>已有账号? <a href="#/login">立即登录</a></p>
                    </div>

                </div>
            </div>
        )
    }

}