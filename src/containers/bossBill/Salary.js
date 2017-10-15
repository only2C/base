import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem} from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import Nav from '../../containers/bossBill/Nav';
// 计件工资

@observer
export default class Salary extends React.Component {

    render(){

        return(
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">计件工资</div>
                <div className="stdreimburse-box">
                    <table  className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>款号</th>
                                <th>姓名</th>
                                <th>工种</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>累计</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><input type="text" placeholder="输入款号"/></td>
                                <td>
                                    <select>
                                        <option>张三</option>
                                        <option>张三2</option>
                                        <option>张三3</option>
                                    </select>
                                </td>
                                <td>
                                    <select>
                                        <option>工种1</option>
                                        <option>工种12</option>
                                        <option>工种13</option>
                                    </select>
                                </td>
                                <td><input type="text" placeholder="单价"/></td>
                                <td><input type="text" placeholder="件数"/></td>
                                <td><input type="text" placeholder="累计"/></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><input type="text" placeholder="输入款号"/></td>
                                <td>
                                    <select>
                                        <option>张三</option>
                                        <option>张三2</option>
                                        <option>张三3</option>
                                    </select>
                                </td>
                                <td>
                                    <select>
                                        <option>工种1</option>
                                        <option>工种12</option>
                                        <option>工种13</option>
                                    </select>
                                </td>
                                <td><input type="text" placeholder="单价"/></td>
                                <td><input type="text" placeholder="件数"/></td>
                                <td><input type="text" placeholder="累计"/></td>
                            </tr>
                        </tbody>
                    </table>
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