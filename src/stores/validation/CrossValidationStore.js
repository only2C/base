import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';
const serverUrl = Config.serverUrl;

class CrossValidationStore {
    globalStore = GlobalStore;

    @observable queryValidationDataParam ={
        "paras": {
            "policyexpensetype": ["validation"],
        },
        "vaguequeryparam": "",
        "page":1,
        "pagenum":10
    };

    @observable queryValidationDataList =[] ;

    @observable queryTotalNum = [] ;

    @computed get getValidataDada (){
        return this.queryValidationDataList ;
    }

    @computed get getValidataPageNum (){
        return this.queryTotalNum
    }
    @action
    queryValidata= ( callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.validation.queryvalidationdata,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify( this.queryValidationDataParam ),
            success: data => {
                this.globalStore.hideWait();
                if(data.success){
                    this.queryValidationDataList = Object.assign([], data.data);
                    this.queryTotalNum = data.totalnum ;
                    if (typeof(callback) === "function") {
                        callback()
                    }
                }else{
                    this.globalStore.showError(!data.message ? "查询失败" : data.message);
                }
            },
            error:(xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        });


    }

    @action
    saveValidata = ( param , callback ) =>{
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.validation.savevalidationdata,
            dataType: "json",
            contentType: "application/json",
            data:  JSON.stringify (param),
            success: data => {
                this.globalStore.hideWait();
                if(data.success){

                    if (typeof(callback) === "function") {
                        callback()
                    }
                }else{
                    this.globalStore.showError(!data.message ? "保存失败" : data.message);
                }
            },
            error:(xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        });

    }

    @action
    deleteValidata = ( param , callback) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.validation.deletevalidationdata,
            dataType: "json",
            contentType: "application/json",
            data:JSON.stringify(param ),
            success: data => {
                this.globalStore.hideWait();
                if (data.success) {
                    // this.checkoutData = Object.assign(this.checkoutData, data.data);
                    if (typeof(callback) === "function") {
                        callback()
                    }
                } else {
                    this.globalStore.showError(!data.message ? "删除失败！" : data.message);
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        });
    }

    @action
    updateValidata = ( param , callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.validation.updatevalidationdata,
            contentType: "application/json",
            data:  JSON.stringify (param),
            success: data => {
                this.globalStore.hideWait();
                if (data.success) {
                    if (typeof(callback) === "function") {
                        callback()
                    }
                } else {
                    this.globalStore.showError(!data.message ? "检查失败" : data.message);
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        });
    }


    @action
    getEditData = ( data ) => {
        this.globalStore.validataEditData = data ;
    }


}
export  default CrossValidationStore ;
