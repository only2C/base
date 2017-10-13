import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';

/**
 * [是/否]确认对话框组件.
 */
export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: null
        };
    };

    show = (data) => {
        this.setState({show: true, data});
    };


    close = () => this.setState({show: false});

    handleYes = () => {
        this.close();
        this.props.onYes(this.state.data);
    };

    handleNo = () => {
        this.close();
        if (this.props.hasOwnProperty('onNo')) {
            this.props.onNo();
        }
    };

    render() {

        const content = this.props.hasOwnProperty('content') ? this.props.content : '';
        const title = this.props.hasOwnProperty('title') ? this.props.title : '请确认';
        return (
            <Modal
                show={this.state.show}
                onHide={this.close}
                container={this}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleNo}>否</Button>
                    <Button bsStyle="primary" onClick={this.handleYes}>授权</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}

ConfirmDialog.propTypes = {
    onYes: PropTypes.func.isRequired,
    onNo: PropTypes.func,
    content: PropTypes.string, //可选的
    title: PropTypes.string //可选的
};