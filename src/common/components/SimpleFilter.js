import React from 'react';
import {Panel, Input} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import DeepLinkedStateMixin from 'react-deep-link-state';

class SimpleFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "name": '', //"供应商名称",
            "code": '', //"供应商编码",
            "organization_code": '', //"组织机构编码",
            "commit_status": '', //"已上传银行"
        };
    }

    condition = () => {
        var result = {};
        for(var key in this.state) {
            if (this.state[key] != '') {
                result[key] = this.state[key];
            }
        }
        return result;
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" name="myform">

                    <div className="form-group">
                        <label for="starttime" className="col-sm-2 control-label">供应商名称</label>

                        <div className="col-sm-4">
                            <input className="form-control" type="text" id="starttime" readOnly="readonly"
                                   valueLink={this.deepLinkState(['name'])}/></div>
                        <label for="endtime" className="col-sm-2 control-label">供应商编码</label>

                        <div className="col-sm-4">
                            <input className="form-control" type="text" id="endtime" readOnly="readonly"
                                   valueLink={this.deepLinkState(['code'])}/></div>

                        <label for="starttime" className="col-sm-2 control-label">组织机构代码</label>

                        <div className="col-sm-4">
                            <input className="form-control" type="text" id="starttime" readOnly="readonly"
                                   valueLink={this.deepLinkState(['organization_code'])}/>
                        </div>
                        <label for="starttime" className="col-sm-2 control-label">已上传</label>

                        <div className="col-sm-4">
                            <select type="select" className="form-control "
                                    valueLink={this.deepLinkState(['commit_status'])}>
                                <option value="">全部</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                </form>

            </div>

        );
    }
}

reactMixin.onClass(SimpleFilter, DeepLinkedStateMixin);

export default SimpleFilter;