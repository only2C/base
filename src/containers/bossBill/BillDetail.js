import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';


// 查看单据详情
@observer
export default class BillDetail extends React.Component {

    render(){
        return (
            <div className="content mt50">
                <Nav navIndex="0"/>
                <div className="details_title">单据详情</div>
                <div className="stdreimburse-box">

                </div>
                <div className="stdreimburse-box">

                </div>
            </div>
        )
    }
}