import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';

// 设置
@observer
export default class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            userName:"",
            password:"",
            email:"",
            idCard:"",
            password:"",
            password2:"",
            passwordError:false
        }
    }

    setInput = (i , e ) =>{
        let that = this ;
        let el = e.target.value ;
        switch(i){
            case 0:
                that.setState({
                    userName:el
                })
                break;
            case 1:
                that.setState({
                    email:el
                })
                break;
            case 2:
                that.setState({
                    idCard:el
                })
                break;
            case 3:
                that.setState({
                    password:el
                })
                break;
            case 4:
                that.setState({
                    password2:el
                })
                break;
            default:
                break;

        }
    }

    validatePassword = () =>{
        if(this.state.password2 != this.state.password){
            this.setState({
                passwordError:true
            })
        }else{
            this.setState({
                passwordError:false
            })
        }
    }

    login =()=>{
        window.location.hash ='#/login';
    }

    render(){
        return (
            <div className="b-login mt100">
                <Nav navIndex=""/>
                <div className="b-login-box ">
                    <h1>修改个人信息</h1>
                    {/**
                    <div className="row mt30">
                        <span>用户名：</span>
                        <input type="text"  value={this.state.userName} placeholder="请输入用户名" onChange={this.setInput.bind(this,0)}/>
                    </div>
                     */}
                    <div className="row mt30">
                        <span>邮箱名：</span>
                        <input type="text"  value={this.state.email} placeholder="请输入邮箱" onChange={this.setInput.bind(this,1)}/>
                    </div>
                    <div className="row mt30">
                        <span>身份证号：</span>
                        <input type="text"  value={this.state.idCard} placeholder="请输入身份证号" onChange={this.setInput.bind(this,2)}/>
                    </div>
                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password"  value={this.state.password} onChange={this.setInput.bind(this,3)}/>
                    </div>
                    <div className="row mt30">
                        <span>确认密码:</span>
                        <input type="password"  value={this.state.password2} onChange={this.setInput.bind(this,4)} onKeyUp={this.validatePassword}/>
                        {this.state.passwordError ? (
                            <span className="b-regist-error" style={{width:"300px"}}>请再次确认密码是否有误</span>
                        ):"" }
                    </div>
                    <div className="row" >
                        <div className="b-regist-box-btn">
                            <Button onClick={this.updateSys}>确定</Button>
                        </div>
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
    //取消
    exit = ()=>{
        window.location.hash= '#/bossBill'
    }
}