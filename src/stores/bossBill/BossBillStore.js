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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                if (data.result == 1 ) {
                    this.userExsistedResult = false ;
                } else {
                    //that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 修改用户密码
    @action userUpatePassword (param , callback ){
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.bossBill.upPwd,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable queryClientListData = [];
    @action queryClientList(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryClientList,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data) {
                    that.queryClientListData = Object.assign([],data.clients);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable getSizeBaseData = [];
    @action getSizeBase(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.getSizeDefault,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    that.getSizeBaseData = Object.assign([],data.sizes);
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "查询失败")
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
                    that.globalStore.showError(data.error ? data.error : "保存失败")
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
                    that.globalStore.showError(data.error ? data.error : "保存失败")
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
                    that.globalStore.showError(data.error ? data.error : "保存失败")
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
                    that.globalStore.showError(data.error ? data.error : "保存失败")
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
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //保存订单本厂加工信息
    @action saveSelfWork(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveSelfwork,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    //保存订单外发加工信息
    @action saveOutwork(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveOutwork,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //保存外发工艺信息
    @action saveOutTech(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.saveOutTech,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //获取外发工厂   /outfactory/find
    @observable outFactoryList = [];
    @action queryOutFactory(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryOutfactory,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    this.outFactoryList = Object.assign([],data.factory)
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    //获取外发工厂   /outfactory/find
    @observable outFactoryItemList = [];
    @action queryOutFactoryItem(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryOutfactoryItem,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    this.outFactoryItemList = Object.assign([],data.items)
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    //获取外发工艺项目   /outtech/find
    @observable outTechList = [];
    @action queryOuttechItem(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryOuttechItem,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    this.outTechList = Object.assign([],data.techs)
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //新增工人   /worker/add
    @action addWorker(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.addWorker,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //新增工种   /work/add
    @action addWork(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.addWork,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //新增工种   /salary/add
    @action addSalary(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.addSalary,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //查找所有工人   /worker/all
    @action queryAllWorker(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryAllWorker,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback(data.workers);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 查找所有工种
    @action queryAllWork(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryAllWork,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback(data.works);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 新增收款
    @action addIncome(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.addIncome,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 新增收款客户
    @action addIncomeClient(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.addIncomeClient,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    //查询收款
    @action queryIncome(param,callback){
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.bossBill.queryIncome,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.result==0) {
                    if (typeof callback == "function") {
                        callback(data.incomes);
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "保存失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


}