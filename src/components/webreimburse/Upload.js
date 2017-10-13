/*
 * 上传组件
 */
import React from 'react';
import {observer} from 'mobx-react';
import FileUpload from '../../common/components/FileUpload';
import _ from 'lodash';
// import WebreImburseStore from '../../stores/webreimburse/WebreImburseStore';
import globalStore from '../../stores/GlobalStore';
import Config from '../../config';
// const webStore = new WebreImburseStore();
@observer
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    /**
     * 0 -> 交通
     1 -> 住宿
     2 -> 餐饮
     3 -> 收款
     4 -> 付款
     5 -> 采购
     6 -> 通讯
     7 -> 其他
     8 -> 销售
     */
    componentWillMount() {
    }

    componentWillReceiveProps(props) {

    }

    // 保存后，生成PK 开始上传
    continueUpload = ()=> {
        $("#fileUpload").click();
    }

    render() {
        const options = this.props.uploadOptions;
        const uploadOptions = {
            baseUrl: Config.webreimburse.uploadWebFile,   // 请求地址
            param: options,
            fileFieldName: 'files',
            chooseFile: (file)=> {
                let result =this.state.fileList;
                let bool = true ;
                _.forEach(file,(value,key)=>{
                    // 单文件 或 多文件上传校验是否重复
                    _.forEach(result , (item , key )=>{
                        if(value.name == item.fileName ){
                           globalStore.showModel( value.name + "文件已存在,请重新选择！");
                            bool = false ;
                        }
                    })
                    if(bool){
                        result.push({"fileName":value.name,"key":new Date().getTime()+key})
                    }

                })
                this.setState({
                    fileList: result
                })
            },
            numberLimit: 9,
            multiple: true,            // 多文件同时导入
            accept: 'image/jpeg,image/png,image/gif,application/pdf,application/msword,application/xml-dtd',// 限制文件后缀
            chooseAndUpload: false,        // 选中后立即导入
            doUpload: ()=> {
                globalStore.showWait();
            },
            uploadSuccess: ()=> {
                globalStore.hideWait();
                console.log("upload status suceess")
            },
            uploadError: (err)=> {
                globalStore.hideWait();
                globalStore.showError('上传附件失败,错误信息:' + err.toString());
            }
        }
        let fileList = this.state.fileList;
        return (
            <div className="col-md-4">
                <div className="upload">
                    <ul>
                        <li className="upload-li">附件</li>
                    </ul>
                    <div className="upload-add">
                        <FileUpload options={ uploadOptions } className="file-upload">
                            <div className="upload-bg choose-btn" ref="chooseBtn"></div>
                            <button className="btn btn-primary upload-btn hide" ref="uploadBtn" id="fileUpload">上传
                            </button>
                        </FileUpload>
                    </div>
                    <div className={fileList.length <= 0 ?"hide" :"upload-complete" }>
                        <h3 className="standard-content">您即将上传的文件：</h3>
                        {fileList.map((item, index)=> {
                            return (
                                <div className="upload-add-list" key={"file-" + index}>
                                    <p title={item.fileName}>文件{index+1}：{item.fileName}</p>
                                    <span title="删除" onClick={this.deleteFiles.bind(this,item.key )}>删除</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }


    deleteFiles = ( key )=> {
        let fileList = this.state.fileList ;
         let result = _.remove(fileList, (value)=>{
            return value.key != key;
        });
        this.setState({
            fileList:result
        })

    }

}

export default Upload;
/*
 fileFieldName (file){
 var formatFileName = "";

 var fileName = file.name;
 var arr = fileName.split(".");
 var suffix = arr.length> 1 ? arr[arr.length-1] : "";
 var genDate = new Date();
 var YYYY = genDate.getFullYear();
 var MM = genDate.getMonth()>10 ? (genDate.getMonth()+1)+'' : '0'+(genDate.getMonth()+1);
 var dd = genDate.getDate()> 10 ? genDate.getDate() + '' : '0'+genDate.getDate();
 var HH = genDate.getHours()> 10 ? genDate.getHours() + '' : '0'+genDate.getHours();
 var mm = genDate.getMinutes()> 10 ? genDate.getMinutes() + '' : '0'+genDate.getMinutes();
 var ss = genDate.getSeconds()> 10 ? genDate.getSeconds() + '' : '0'+genDate.getSeconds();
 var sss = genDate.getMilliseconds();
 switch (sss){
 case sss <10:
 sss = '00'+sss;
 break;
 case sss <100:
 sss = '0'+sss;
 break;
 default:
 sss = ''+sss;
 }

 var randomNum = "";
 for(var i=0; i<8; i++){
 randomNum+=Math.floor(Math.random()*10);
 }

 if(suffix!=""){
 formatFileName = YYYY+MM+dd+HH+mm+ss+sss+randomNum+'.'+suffix;
 }else{
 formatFileName = YYYY+MM+dd+HH+mm+ss+sss+randomNum;
 }

 return formatFileName;
 },
 *
 * */