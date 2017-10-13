import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';
const serverUrl = Config.serverUrl;

class LeadStore {
    globalStore = GlobalStore;

    @observable osTypeInfo = {} ;
    @observable saveErpRegisterResult = {};


    // 获取当前用户信息
    @action
    getOsType =(callback) =>{

      //  let data ={"phone":"15718813477","tenantId":null,"osType":"U8","registered":"false"} ;
        this.globalStore.showWait();
        $.ajax({
            type: "GET",
            url: Config.systemIntegration.getOsType,
            dataType: "json",
            contentType: "application/json",
            data: [],
            success: data => {
                this.globalStore.hideWait();
               if(data.code == 0 ){
                    this.osTypeInfo = Object.assign({},data);
                    if(typeof callback=="function"){
                        callback()
                    }
                }else{
                    this.globalStore.showError(!data.errMsg ? "查询失败" : data.errMsg , false );
                }
            },
            error:(xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        });
    }

    @action
    saveErpRegister =(param , callback ) =>{
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.systemIntegration.saveErpRegister + "?phone=" +this.osTypeInfo.phone,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify( param ),
            success: data => {
                this.globalStore.hideWait();
                this.saveErpRegisterResult = Object.assign({},data)
                if (typeof(callback) === "function") {
                    callback()
                }
            },
            error:(xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showModel('数据请求失败,错误信息:' + err.toString());
            }
        });
    }


    // 门同步接口
    @action syncDept(data,callback){
      var that =this;
      $.ajax({
          type: "POST",
          url: Config.systemIntegration.syncDept,
          dataType: "json",
          data: data,
          contentType: "application/x-www-form-urlencoded",
          // contentType: "application/json",
          success: data => {
            if (data.code==1) {
              callback(0)
            }else{
              callback(1)
              // that.globalStore.showError(data.message?data.message:"查询失败")
            }
          },
          error: (xhr, status, err) => {
            callback(1)
            // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
          }
        })
    }

    // 门同步接口
    @action syncProject(data,callback){
      var that =this;
      $.ajax({
          type: "POST",
          url: Config.systemIntegration.syncProject,
          dataType: "json",
          data: data,
          contentType: "application/x-www-form-urlencoded",
          // contentType: "application/json",
          success: data => {
            if (data.code==1) {
              callback(0)
            }else{
              callback(1)
              // that.globalStore.showError(data.message?data.message:"查询失败")
            }
          },
          error: (xhr, status, err) => {
            callback(1)
            // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
          }
        })
    }
    // 门同步接口
    @action syncProjectClass(data,callback){
      var that =this;
      $.ajax({
          type: "POST",
          url: Config.systemIntegration.syncProjectClass,
          dataType: "json",
          data: data,
          contentType: "application/x-www-form-urlencoded",
          // contentType: "application/json",
          success: data => {
            if (data.code==1) {
              callback(0)
            }else{
              callback(1)
              // that.globalStore.showError(data.message?data.message:"查询失败")
            }
          },
          error: (xhr, status, err) => {
            callback(1)
            // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
          }
        })
      }

      // 取消
      @action cancelSync(data,callback){
        var that =this;
        $.ajax({
            type: "POST",
            url: Config.systemIntegration.cancelSync,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
              if (data.code==1) {
                callback(0)
              }else{
                callback(1)
                // that.globalStore.showError(data.message?data.message:"查询失败")
              }
            },
            error: (xhr, status, err) => {
              callback(1)
              // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
          })
      }
}
export default LeadStore ;
