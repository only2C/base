import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class BossBillStore {

    globalStore = GlobalStore;

    //用户注册
    @observable userRegResult = {};
    @action userReg (param , callback ){
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.bossBill.userReg,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data) {
                    this.userRegResult = Object.assign({},data)
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 验证邮箱是否存在
    @observable userExsistedResult = false ;
    @action userExsisted (param){
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.bossBill.userExsisted,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result == 0 ) {
                    this.userExsistedResult = true ;
                } else {
                    //that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action userLogin(param,callback){
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.bossBill.userLogin,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                } else {
                    //that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable orderListGather=[];
    @observable orderListOrders =[];
    @observable orderListPage ={};
    @action queryOrderList(param , callback ){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryOrderList,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result == 0) {
                        this.orderListGather = Object.assign([],data.gather);
                        this.orderListOrders = Object.assign([],data.orders);
                        this.orderListPage = Object.assign({},data.Pager)

                    if (typeof callback == "function") {
                        callback(data);
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable queryClientListData = [];
    @action queryClientList(callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryClientList,
            dataType: "json",
            data: JSON.stringify({}),
            contentType: "application/json",
            success: data => {
                if (data) {
                    that.queryClientListData = Object.assign([],data.clients);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @observable saveOrderBaseData = {};
    @action saveOrderBase (param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveOrderBase,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    that.saveOrderBaseData = Object.assign([],data.data);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable getSizeBaseData = [];
    @action getSizeBase(callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.getSizeBase,
            dataType: "json",
            data: JSON.stringify({}),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    that.getSizeBaseData = Object.assign([],data.sizes);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable saveOrderSizesData =[];
    @action saveOrderSizes(){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveOrderSizes,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    that.saveOrderSizesData = Object.assign([],data.data.sizes);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
}