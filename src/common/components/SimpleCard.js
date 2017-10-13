import React from 'react';
import {Panel, Input} from 'react-bootstrap';

var SimpleCardItem = React.createClass({
    render () {
        return (
            <div className="form-group">
                <label for="starttime" className="col-sm-3 control-label">{this.props.label}</label>

                <div className="col-sm-5">
                    <input className="form-control" type="text"  value={this.props.value} id="starttime" readOnly="readonly"
                          />
                </div>

            </div>

        );
    }
});

var SimpleCard = React.createClass({
    getDefaultProps () {
        return {
            cols: {"a":"供应商编码", "b":"供应商名称"},
            row: {"a":"123", "b": "456"}
        };
    },
    render () {
        var cols = this.props.cols;
        var row = this.props.row;


        function toArray(data) {
            var result = [];
            for (var key in  data) {
                result.push(key);
            }
            return result;
        }

        return (
            <div>
                <form className="form-horizontal" name="myform">

                    {
                        toArray(this.props.cols).map(function (col) {
                            return (
                                    <SimpleCardItem label={cols[col]} value={row[col]} />
                            )
                        })
                    }

                </form>

            </div>

        );
    }
});

export default SimpleCard;