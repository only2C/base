import React from 'react';

var AjaxTable = React.createClass({
    getInitialState: function () {
        return {rows: []};
    },

    handleLoad: function (url) {
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                this.setState({rows: data});
                console.log(JSON.stringify(data));
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.handleLoad(this.props.url);
    },

    componentWillUnmount: function () {
    },


        render: function () {
            var cols = this.props.cols;

            function getRow(row, idx, cols) {
                console.log(cols);
                let tds = [];
                for(let col in cols) {
                    tds.push(<td>{row[col]}</td>);
                }
                return <tr key={idx}>{tds}</tr>;
            }

            function toArray(data) {
                var result = [];
                for (var key in  data) {
                    result.push(data[key]);
                }
                return result;
            }

            return (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        {
                            toArray(this.props.cols).map(function (col) {
                                return (
                                    <th>{col}</th>
                                )
                            })
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.rows.map(function(row, idx) {
                            return getRow(row, idx, cols)
                        })
                    }

                    </tbody>
                </table>
            );
        }
});

export default AjaxTable;