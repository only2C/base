import React from 'react';
import {observer} from 'mobx-react';
import {Button,DropdownButton,MenuItem} from 'react-bootstrap';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
@observer
export default class Nav extends React.Component {

    render(){
        return(
            <div className="btn-bottom-fixed-top">
                <div className="row btn-bottom">
                    <div className="col-sm-4 b-nav" >
                        <a href="#/bossBill" className={this.props.navIndex == 0 ? "b-nav-active":""}>订单</a>
                        <a href="#/credit" className={this.props.navIndex == 1 ? "b-nav-active":""}>贷款</a>
                    </div>
                    <div className="col-sm-8">
                        <div className="fr">
                            <DropdownButton bsStyle="default" title="Admin" key="9" >
                                <MenuItem eventKey="1" onClick={this.bindEvent.bind(this,0)}>设置</MenuItem>
                                <MenuItem eventKey="2" onClick={this.bindEvent.bind(this,1)}>退出</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    bindEvent = (param) =>{
        let router ="login";
        if(param==0){
            router ='setting'
        }
        window.location.hash='#/'+router;
    }

}