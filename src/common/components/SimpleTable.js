import React from 'react';

export default React.createClass({
    getDefaultProps () {
        return {
            cols: {},
            rows: []
        };
    },

    render () {
        var cols = this.props.cols;
        var onRow = this.props.onRow;

        function toArray(data) {
            var result = [];
            for (let col in cols) {
                result.push(data[col]);
            }
            return result;
        }


        function toDeepArray(data) {
            //alert(JSON.stringify(data));return;
            var result = [];
            for (let col in cols) {
                if (!col.includes('.')) {
                    result.push(data[col]);
                } else {
                    var strs = col.split('.');
                    var temp = data[strs[0]];
                    for (var i = 1; i < strs.length; i++) {
                        temp = temp[strs[i]];
                    }
                    result.push(temp);
                }
            }
            return result;
        }

        return (
            <div style={{overflow: "auto"}}>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        {
                            toArray(this.props.cols).map(function (col) {
                                return (
                                    <th style={{whiteSpace:"nowrap"}}>{col}</th>
                                )
                            })
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.props.rows.map(function (row, idx) {
                            return (
                                <tr key={idx} onClick={() => onRow(idx)}>{
                                    toDeepArray(row).map(function (item) {
                                        return (
                                            <td>{item}</td>
                                        )
                                    })
                                }</tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>
        );
    }
});