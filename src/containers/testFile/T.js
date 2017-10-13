/**
 * @desc   新增借款单
 * @date   2017年9月12日
 * chenliw@yonyou.com
 **/
import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
const store = new WebreImburseStore();
@observer
export default class T extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headerInfo: {},
            tableList: {}
        }
    }


    render() {
        return (
            <div className="content">
                <div className="details_title">测试中</div>
            </div>
        )
    }

}
