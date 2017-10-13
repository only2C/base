import React from 'react';
import {Alert} from 'react-bootstrap';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';

@observer
class Alerts2 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAlertDismiss = () => {
    globalStore.alertMsg = Object.assign(globalStore.alertMsg, {message: '', alertVisible: false});
  };

  render() {
    let _this=this;
    if (globalStore.alertMsg.alertVisible) {
      return (
        <Alert bsStyle={globalStore.alertMsg.type} onDismiss={_this.handleAlertDismiss} className="ssc-alert">
          <p title={globalStore.alertMsg.message} className="alert-tip">{globalStore.alertMsg.message}</p>
        </Alert>
      );
    }else{
      return(<div></div>)
    }
  }
}
export default Alerts2;
