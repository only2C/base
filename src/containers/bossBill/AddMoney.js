import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';

// 新增收款
@observer
export default class AddMoney extends React.Component {

    render(){
        return(
            <div>新增收款</div>
        )

    }
}