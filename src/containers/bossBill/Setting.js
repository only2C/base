import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';
import billStore from '../../stores/bossBill/BossBillStore';
const store = new billStore();
import localforage from 'localforage';
// 设置
@observer
export default class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            password:"",
            password2:"",
            passwordError:false,
            userId:""
        }
    }

    componentWillMount(){
        let that = this;
        localforage.getItem("loginInfo",function(err,value){
            that.setState({
                userId:value.user.id
            })
        });


        $("#root").addClass("b-login")
    }

    setInput = (i , e ) =>{
        let that = this ;
        let el = e.target.value ;
        switch(i){
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

                    <div className="row mt30">
                        <span>密码:</span>
                        <input type="password" className="b-input" value={this.state.password} onChange={this.setInput.bind(this,3)}/>
                    </div>
                    <div className="row mt30">
                        <span>确认密码:</span>
                        <input type="password" className="b-input" value={this.state.password2} onChange={this.setInput.bind(this,4)} onKeyUp={this.validatePassword}/>
                        {this.state.passwordError ? (
                            <span className="b-regist-error" style={{width:"300px"}}>请再次确认密码是否有误</span>
                        ):"" }
                    </div>
                    <div className="row" >
                        <div className="b-regist-box-btn">
                            <p className="error">{this.state.passwordSuccess}</p>
                            <Button bsStyle="warning" onClick={this.updateSys}>确定</Button>
                            <Button onClick={this.exit}>取消</Button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
    updateSys =()=>{
        let param ={
            user_id:this.state.userId,
            pwd:this.state.password
        };
        store.userUpatePassword(param,()=>{
            this.setState({
                passwordSuccess:"修改成功!"
            })
        })
    }
    //取消
    exit = ()=>{
        window.history.back(-1);
    }
}