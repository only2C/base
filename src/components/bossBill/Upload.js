/*
 * 上传组件
 */
import React from 'react';
import {observer} from 'mobx-react';
import FileUpload from '../../common/components/FileUpload';
import _ from 'lodash';
import globalStore from '../../stores/GlobalStore';
import Config from '../../config';

@observer
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {

    }


    render() {
        let that = this ;
        const options = this.props.uploadOptions || {};
        const uploadOptions = {
            baseUrl: Config.bossBill.upload,   // 请求地址
            param: options,
            fileFieldName: 'files',
            chooseFile: (file)=> {
                /*let result =this.state.fileList;
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
                })*/
            },
            numberLimit: 9,
            multiple: true,            // 多文件同时导入
            accept: 'image/jpeg,image/png,image/gif,application/pdf,application/msword,application/xml-dtd',// 限制文件后缀
            chooseAndUpload: true,        // 选中后立即导入
            doUpload: ()=> {
                globalStore.showWait();
            },
            uploadSuccess: (data)=> {
                globalStore.hideWait();
                data.id = this.props.id ;
                that.props.successCallBack(data);


            },
            uploadError: (err)=> {
                globalStore.hideWait();
                globalStore.showError('上传附件失败,错误信息:' + err.toString());
            }
        }
        return (

                <div className="upload">
                    <div className="upload-add">
                        <FileUpload options={ uploadOptions } className="file-upload" >
                            <div className="upload-bg choose-btn" ref="chooseAndUpload"></div>
                        </FileUpload>
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