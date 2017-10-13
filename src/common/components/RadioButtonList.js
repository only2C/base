import React from 'react';
export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label htmlFor={this.props.id}>
                <input type="radio"
                       id={this.props.id}
                       name={this.props.name}
                       value={this.props.value}
                       checked={this.props.checked}
                       onChange={this.handleChange}/>
                {this.props.text}
            </label>
        );
    }

    handleChange = (event) => {
        this.setState({selectedValue: event.target.value});
        if (this.props.onSelectedValueChanged) {
            this.props.onSelectedValueChanged(event);
        }
    }
}

export default class RadioButtonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue
        };
    }

    setValue = (val) => {
        this.setState({selectedValue: val});
    }

    render() {
        return (
            <span className="radioButtonList">{this.renderRadionButtons()}
                </span>
        );
    }

    renderRadionButtons = () => {
        return this.props.listItems.map(function (item, index) {
            return (<RadioButton key={this.props.name + "_" + index}
                                 name={this.props.name}
                                 value={item.value||item}
                                 text={item.text||item}
                                 checked={this.state.selectedValue == (item.value||item)}
                                 onSelectedValueChanged={this.onSelectedValueChanged}/>);
        }.bind(this));
    }

    onSelectedValueChanged = (event) => {
        this.setState({selectedValue: event.target.value});
        this.props.onChange(event);
    }
}
