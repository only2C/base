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

    @action orderAdd(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.orderAdd,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result == 0) {
                    if(typeof callback == "function"){
                        callback(data.order_id)
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

    //获取工厂信息
    @observable factoryList=[];
    @action getFactoryList (){
        let data ={
            factoryList:[{id:1,name:"工厂A"},{id:2,name:"工厂B"}]
        };
        this.factoryList = Object.assign([],data.factoryList)

    }

    @action orderSave(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.orderSave,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result == 0) {
                    if(typeof callback == "function"){
                        callback(data)
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



    @observable orderListGather=[];
    @observable orderListOrders =[];
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
                        this.orderListGather = Object.assign([],data.summarizes);
                        this.orderListOrders = Object.assign([],data.orders);
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

    //保存尺码
    @action saveSizes(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveSizes,
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

    // 保存订单信息图片
    @action saveOrderImg(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveOrderImg,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action saveColth(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveColth,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @action saveSubmaterial(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveSubmaterial,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @action saveTech(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveTech,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @action saveDeliver(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveDeliver,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.information ? data.information : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
}