import React from 'react';

export default class Validate extends React.Component {
    render() {
        return (
            <div id="login-err" className="login-err alert alert-danger"
                 style={{ display: this.props.isValidate ? "none": "block"}}>{this.props.validateMessage}
            </div>
        );
    }
};
