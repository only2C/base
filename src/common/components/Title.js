
import React from 'react';

export default class Title extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.name}</h4>
                <p>{this.props.description}</p>
            </div>
        );
    }
};
