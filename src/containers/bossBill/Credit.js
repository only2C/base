import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import {DatePicker2} from 'ssc-grid';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import  Nav from '../../containers/bossBill/Nav';

// 贷款
@observer
export default class Credit extends React.Component {

    render(){
        return (

            <div className="mt50">
                <Nav navIndex="1"/>
                贷款
            </div>
        )
    }
}