import React from 'react';
import {Alert} from 'react-bootstrap';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';

@observer
class AlertFixed extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAlertDismiss = () => {
    globalStore.fixedMsg = Object.assign(globalStore.fixedMsg, {message: '', alertVisible: false});
  };

  render() {
    let _this=this;
    if (globalStore.fixedMsg.alertVisible) {
      return (
        <Alert bsStyle={globalStore.fixedMsg.type} onDismiss={_this.handleAlertDismiss}>
          <p title={globalStore.fixedMsg.message}>{globalStore.fixedMsg.message}</p>
        </Alert>
      );
    }else{
      return(<div></div>)
    }
  }
}
export default AlertFixed;
