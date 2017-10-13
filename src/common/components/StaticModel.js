/**
 * 弹窗口组件封装，支持扩展。
 * chenliw@yonyou.com
 * @param
 * showModal:false,   //是否显示
   title:"提示",    // 标题
   message:"",      // 主体内容
   hasClose:true,   // 是否可以关闭
   hasSureFn:'',    // 确认按钮的回调函数
   hasCancelFn:'',  // 取消按钮的回调函数
   hasCancel:false,  // 是否显示取消按钮
   sureTxt:'确定',    // 确认按钮文字
   cancelTxt:'取消'   //取消按钮文字
 *
 */
import React from 'react';
import {Modal,Button } from 'react-bootstrap';

class StaticModel extends React.Component{
    constructor(props) {
        super(props);
        props;
        this.state = {
            showModal:false,
            title:"提示",
            message:"",
            hasClose:true,
            hasSureFn:'',
            hasCancelFn:'',
            hasCancel:false,
            sureTxt:'确定',
            cancelTxt:'取消'
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    sureFn =() =>{
        this.state.hasSureFn();
        this.setState({ showModal: false });
    }
    cancelFn =() =>{
        this.state.hasCancelFn();
        this.setState({ showModal: false });
    }

    showAlert = (para) =>{
        let _this = this;
        _this.setState({
            showModal: true,
            title:para.title?para.title:_this.state.title,
            message:para.message,
            hasClose:para.hasClose!=undefined?para.hasClose:_this.state.hasClose,
            hasSureFn:para.hasSureFn || '' ,
            hasCancelFn:para.hasCancelFn || '' ,
            hasCancel:para.hasCancel!=undefined?para.hasCancel:_this.state.hasCancel,
            sureTxt:para.sureTxt || '确定',
            cancelTxt:para.cancelTxt || '取消'
        },function () {
            let _dialog = $(".static-modal .modal-dialog");
            let _scrollTop = $(top.document).scrollTop();
            let _marginTop = _scrollTop === 0 ? 30 : _scrollTop;
            _dialog.css({"margin-top":_marginTop+"px"});
        });
    }

    render () {
        let _this=this;
        let modelHead=(
            <Modal.Header>
                <Modal.Title>{this.state.title}</Modal.Title>
            </Modal.Header>
        );
        if(this.state.hasClose){
            modelHead = (
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>)
        }
        let modelFoot = (
            <Modal.Footer>
                <Button bsStyle="primary" onClick={_this.close}>{_this.state.sureTxt}</Button>
            </Modal.Footer>
        );
        if(this.state.hasCancel){
            modelFoot = (
                <Modal.Footer>
                    <Button onClick={_this.close}>{_this.state.cancelTxt}</Button>
                    <Button bsStyle="primary" onClick={_this.close}>{_this.state.sureTxt}</Button>
                </Modal.Footer>
            );
        }

        if( typeof (this.state.hasSureFn ) =="function" ){
            modelFoot = (
                <Modal.Footer>
                    <Button onClick={_this.close}>{_this.state.cancelTxt}</Button>
                    <Button bsStyle="primary" onClick={_this.sureFn}>{_this.state.sureTxt}</Button>
                </Modal.Footer>
            );
        }
        if( typeof (this.state.hasSureFn ) =="function"
            && typeof (this.state.hasCancelFn ) =="function"
        ){
            modelFoot = (
                <Modal.Footer>
                    <Button onClick={_this.cancelFn}>{_this.state.cancelTxt}</Button>
                    <Button bsStyle="primary" onClick={_this.sureFn}>{_this.state.sureTxt}</Button>
                </Modal.Footer>
            );
        }


        return (
            <Modal show ={this.state.showModal} onHide={this.close} className ="static-modal">
                {modelHead}
                <Modal.Body>
                    {this.state.message}
                </Modal.Body>
                {modelFoot}
            </Modal>
        );
    }
}

export default StaticModel;
