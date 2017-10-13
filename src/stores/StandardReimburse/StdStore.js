import {observable, computed, action} from 'mobx';
import Config from '../../config';
import GlobalStore from '../GlobalStore';
import $ from 'jquery';
class StdStore {
    globalStore = GlobalStore;

    @observable queryStandardDataParam ={
        "paras": {
            "policyexpensetype": [""],
        },
        "vaguequeryparam": "",
        "page":1,
        "pagenum":10
    };

    @observable queryStandardDataList =[] ;

    @observable queryTotalNum = [] ;

    @computed get getStdDada (){
        return this.queryStandardDataList ;
    }

    @computed get getStdPageNum (){
        return this.queryTotalNum
    }

    @action
    queryStd= ( callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse2.querystandarddata2,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify( this.queryStandardDataParam ),
            success: data => {
                this.globalStore.hideWait();
                if(data.success){
                    this.queryStandardDataList = Object.assign([], data.data);
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
    saveStd = ( param , callback ) =>{
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse2.savestandarddata2,
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
    deleteStd = ( param , callback) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse2.delstandarddata2,
            dataType: "json",
            contentType: "application/json",
            data:JSON.stringify(param ),
            success: data => {
                this.globalStore.hideWait();
                if (data.success) {
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
    updateStd = ( param , callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse2.updatestandarddata2,
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
        this.globalStore.stdEditData = data ;
    }
}

export default StdStore;
