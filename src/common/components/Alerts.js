import React from 'react';
import {Alert} from 'react-bootstrap';

class Alerts extends React.Component{
    constructor(props) {
        super(props);
        props;
        this.state = {
            alertVisible: false,
            message:"",
            type:"danger",//"success", "warning", "danger", "info"
            autoClose:true
        }
    }

    showAlerts = (para)=> {
        let _this = this;
        _this.setState({
            alertVisible:true,
            message:para.message,
            type:para.type!=undefined?para.type:_this.state.type,
            autoClose:para.autoClose!=undefined?para.autoClose:_this.state.autoClose
        });
        if(this.state.autoClose){
            setTimeout(_this.handleAlertDismiss,3000);
        }
    };
    handleAlertDismiss = () => {
        this.setState({alertVisible: false});
    };

    handleAlertShow = () => {
        this.setState({alertVisible: true});
    };

    render() {
        let _this=this;
        if (this.state.alertVisible) {
            return (
                <Alert bsStyle={_this.state.type} onDismiss={_this.handleAlertDismiss}>
                    <p>{_this.state.message}</p>
                </Alert>
            );
        }else{
            return(<div></div>)
        }
    }
}
export default Alerts;
