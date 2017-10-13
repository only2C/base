import React from 'react';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';

export default class SimpleDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.value == '' ? moment().format("YYYY-MM-DD"): this.props.value,
            format: "YYYY-MM-DD",
            inputFormat: "YYYY-MM-DD",
            mode: "date"
        };
    }

    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    }

    getValue = () => {
        return this.state.date;
    }

    setValue = (val) => {
        this.setState({date: val});
    }

    render() {
        const {date, format, mode, inputFormat} = this.state;
        return <DateTimeField
            dateTime={date}
            format={format}
            viewMode={mode}
            inputFormat={inputFormat}
            onChange={this.handleChange}
            />;
    }
}
