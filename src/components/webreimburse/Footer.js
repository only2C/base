import React from 'react';
import globalStore from '../../stores/GlobalStore';
class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    goBackPage = ()=>{
        let isEdit = globalStore.getCache("isEdit");
        let setRouter = '/billedit/' + this.props.pk;
        if(isEdit){
            setRouter ='/billRecoveryEdit/'+this.props.pk+'/'+this.props.keyValue;
        }
        this.props.router.replace(setRouter);
        
    }

    render(){
        return(
            <div className="btn-bottom-fixed">
                <div className="row btn-bottom">
                    <div className="col-sm-12">
                        <button type="button" onClick={this.props.submitClick} className='btn btn-primary fr'>保存</button>
                        <button type="button" onClick={this.goBackPage} className='btn btn-default fr'>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer ;