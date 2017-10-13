import React from 'react';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';

export default class SimpleTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "time",
            date:moment().format('ss mm hh')
        };
    }

    handleChange = (newDate) => {
        //console.log("newDate", newDate.format('YYYYMMDD'));
        var v = parseInt(newDate);
        var x = moment(v).format('ss mm hh');
        console.log("newDate", x);
        return this.setState({date: x});
    }

    getValue = () => {
        return this.state.date;
    }

    render() {
        const {date, mode, format} = this.state;
        return <DateTimeField
            mode={mode}
            onChange={this.handleChange}
            />;
    }
}
