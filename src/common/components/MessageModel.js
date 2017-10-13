/**
 * 消息弹窗口组件
 */
import React from 'react';
import {Modal,Button } from 'react-bootstrap';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';

@observer
class MessageModel extends React.Component{
    constructor(props) {
        super(props);
    }

    close = () => {
        globalStore.modelMsg = Object.assign(globalStore.modelMsg, {message: '', modelVisible: false});
    };
    cancelFn = () => {
        if (typeof (globalStore.modelMsg.cancelFn) === "function") {
            globalStore.modelMsg.cancelFn();
        }
       this.close();
    }

    sureFn = () => {
        if (typeof (globalStore.modelMsg.sureFn) === "function") {
            globalStore.modelMsg.sureFn();
        }
        this.close();
    }

    render () {
        let _this=this;
        return (
            <Modal show ={globalStore.modelMsg.modelVisible} onHide={_this.close} bsSize={globalStore.modelMsg.bsSize }
                   className ={( globalStore.modelMsg.bsSize &&globalStore.modelMsg.bsSize!="" )?"": "static-modal"}>
                <Modal.Header>
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {globalStore.modelMsg.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button  className={globalStore.modelMsg.hasCancel===true?"":"hidden"} onClick={_this.cancelFn}>取消</Button>
                    <Button bsStyle="primary" onClick={_this.sureFn}>确定</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MessageModel;
