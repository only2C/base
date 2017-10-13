import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class WebreImburseStore {

    globalStore = GlobalStore;

    // 其他记事
    @observable money = 0;
    @observable taxrate = 1;

    // 增值税计算
    @computed get addedTax() {
        return this.money / (1 + this.taxrate) * (this.taxrate);
    }

    // 未含税值计算
    @computed get reduceTax() {
        return this.money - this.money / (1 + this.taxrate) * (this.taxrate);
    }

    @observable tabNav = 0 ;
    @computed get getTabNav(){
        return this.tabNav ;
    }

    @observable validateTips = {
        moeny:"金额格式不正确" ,
        phone:"请输入正确的手机号",
        communicateType:"通讯费用类型不能为空",
        communicateDate: "记事日期不能为空",
        communicateStart: "费用期间起始日期不能为空",
        communicateEnd: "费用期间截止日期不能为空",
        startDate: "起始时间不能为空",
        endDate:"终止时间不能为空",
        trafficToolsValue: "交通工具不能为空",
        address:{start:"起始地点不能为空",end:"终止地点不能为空"} ,
        company:"公司名称不能为空",
        personNum:"请输入正整数",
        timeValue:"日期不能为空",
        compareTime:"起始时间须小于终止时间",
        city:"入住城市不能为空",
        hotel:"入住酒店不能为空",
        taxrate:"增值税发票的税率不能为空"
    }

    //校验正则表达式  第一个参数必选
    @action validatePhone(phone, errorTips) {
        let reg = /^1[34578]\d{9}$/;
        if (!phone) {
            return;
        }
        if (reg.test(phone)) {
            return  "";
        } else {
            return errorTips || this.validateTips.phone;
        }
    }

    //校验金额 第一个参数必选
    @action validateMoney(money, errorTips) {
        money = Utils.unmakeFormatCurrecy(money);
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (reg.test(money)) {
            return "";
        } else {
            return errorTips ||this.validateTips.moeny;
        }
    }

    //校验人数 第一个参数必选
    @action validatePerson(person, errorTips) {
        let reg = /^[1-9]\d*$/;
        if (reg.test(person)) {
            return "";
        } else {
            return errorTips ||this.validateTips.personNum;
        }
    }

    //复合校验
    @action setErrorMessage(obj, message, validateResult) {
        if (validateResult != undefined) {
            if (!obj || validateResult != "") {
                return message
            }
        } else {
            if (!obj) {
                return message
            }
        }
    }

    //去空数组
    @action grepArray(arrayList) {
        return $.grep(arrayList, function (n, i) {
            if (n != "") {
                return n
            }
        }, false);
    }

    //时间比较
    @action compareTime(t1, t2) {
        let tips ="";
        if( t1 && t2 && t1 > t2 ){
            tips=this.validateTips.compareTime;
        }
        return tips ;
    }

    //查询标明哪类记事包含哪个参照类型参数的接口
    @action getNodeRefs(callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getNodeRefs,
            dataType: "json",
            data: JSON.stringify({}),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
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


    //查询参照值的接口
    @action queryRefItem(param, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.queryRefItem,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 1) {
                    if (typeof callback == "function") {
                        callback(data.data);
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

    @action getPhone(callback){
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getPhone,
            dataType: "json",
            data:  JSON.stringify({}),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                } else {
                    this.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable uploadOptions = {};
    @computed get getUploadOptions (){
        return this.uploadOptions;
    }

    //交通新增 nodeType 的值参照 upload.js 注释部分
    @action saveTravelNode(param, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.saveTravelNode,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    let param = {
                        nodeType: 0,
                        nodePk: data.result.travel.pk,
                        deleteFiles: ""
                    }
                    that.uploadOptions = Object.assign({}, param);
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
    // 交通修改
    @action updateTravelNode(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.updateTravelNode,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
                if (data.code == 1) {

                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action getSeat(param, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getSeat,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
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

    // 住宿新增
    @action saveHotelNode(param,callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.saveHotelNode,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    let param = {
                        nodeType:1,
                        nodePk:data.result.hotel.pk,
                        deleteFiles:""
                    }
                    that.uploadOptions= Object.assign({},param );
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
    // 住宿修改
    @action updateHotelNode(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.updateHotelNode,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
                if (data.code == 1) {

                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 餐饮新增
    @action saveEatingNode(data, callback) {
        let that = this;

        $.ajax({
            type: "POST",
            url: Config.webreimburse.saveEatingNode,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    let param = {
                        nodeType: 2,
                        nodePk: data.result.eating.pk,
                        deleteFiles: ""
                    }
                    that.uploadOptions = Object.assign({}, param);
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
    // 餐饮修改
    @action updateEatingNode(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.updateEatingNode,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
                if (data.code == 1) {

                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    // 通讯新增
    @action saveCommunicateNode(data, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.saveCommunicateNode,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {

                    let param = {
                        nodeType:6,
                        nodePk:data.result.communicate.pk,
                        deleteFiles:""
                    }
                    that.uploadOptions= Object.assign({},param );

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
    // 通讯修改
    @action updateCommunicateNode(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.updateCommunicateNode,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
                if (data.code == 1) {

                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 其他新增
    @action saveOtherNode(data,callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.saveOtherNode,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    let param = {
                        nodeType:7,
                        nodePk:data.result.other.pk,
                        deleteFiles:""
                    }
                    that.uploadOptions= Object.assign({},param );

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
    // 其他修改
    @action updateOtherNode(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.updateOtherNode,
            dataType: "json",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            success: data => {
                if (data.code == 1) {

                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //获取全部单据类型
    @observable getBillTypeData = []
    //当前的单据类型
    @observable BillTypeDataItem = {}
    // 获取全部单据类型  continueGo// 是否往下走，如果传入false，代表显示tab页
    @action getBillType(params, pk , callback , continueGo) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getBillType,
            dataType: "json",
            data: JSON.stringify(params),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    data.information.forEach((item)=> {
                        if (item.pk == pk) {
                            that.BillTypeDataItem = Object.assign({}, item);
                        }
                    })
                    if (typeof callback == "function") {
                        callback(that.BillTypeDataItem);
                    }
                    if (continueGo != false) {
                        that.getBillTypeData = Object.assign([], data.information)
                        //获取表头信息
                        that.getLoanBillItemInformation({billType: that.BillTypeDataItem.billtype})
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

    @observable getLoanBillItemInformationData = [];
    @observable getLoanBillItemOtherInformation ={};
    // 获取表头信息
    @action getLoanBillItemInformation(param) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getLoanBillItemInformation,
            dataType: "json",
            data: JSON.stringify(param),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    that.getLoanBillItemInformationData = Object.assign([], data.information.map((item)=> {
                        item.type = item.source_type.length > 2 ? item.source_type.substr(1, 1) : 0
                        item.typeTwo = item.source_type.length > 3 ? item.source_type.substr(2, 1) : 0
                        return item;
                    }))
                    that.getLoanBillItemOtherInformation =Object.assign({},data.otherInformation)
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @observable getNodesByDateWithTemplatePkData = []

    updateItemData(zItem) {
        let that = this;
        if (zItem.type == 'travel') {
            zItem.fromCity_toCity = zItem.fromCity + '--' + zItem.toCity;
            zItem.date_ = (zItem.startDate ? Utils.formatDate(Number(zItem.startDate)) : '') + '--' + (zItem.endDate ? Utils.formatDate(Number(zItem.endDate)) : '')
            zItem.selfDate = (zItem.startDate ? Utils.formatDate(Number(zItem.startDate)) : '') + '--' + (zItem.endDate ? Utils.formatDate(Number(zItem.endDate)) : '')
            zItem.selfMessage = zItem.fromCity + "-" + zItem.toCity + " " + zItem.travelWay
        } else if (zItem.type == 'hotel') {
            zItem.startDate_endDate = (zItem.startDate ? Utils.formatDate(zItem.startDate) : '' ) + '--' + (zItem.endDate ? Utils.formatDate(zItem.endDate) : '');
            zItem.selfDate = (zItem.startDate ? Utils.formatDate(Number(zItem.startDate)) : '') + '--' + (zItem.endDate ? Utils.formatDate(Number(zItem.endDate)) : '')
            zItem.selfMessage = zItem.city + "-" + zItem.hotel
        } else if (zItem.type == 'eating') {
            zItem.date_ = zItem.date ? Utils.formatDate(zItem.date) : ''
            zItem.selfDate = zItem.eatingDate ? Utils.formatDate(Number(zItem.eatingDate)) : ''
            zItem.selfMessage = zItem.company + "-" + zItem.personNum + "人"
        } else if (zItem.type == 'communicate') {
            zItem.communicateDate_ = (zItem.communicateStart ? Utils.formatDate(zItem.communicateStart, 'ym') : '' ) + '--' + (zItem.communicateEnd ? Utils.formatDate(zItem.communicateEnd, 'ym') : '');
            zItem.selfDate = (zItem.communicateStart ? Utils.formatDate(Number(zItem.communicateStart)) : '') + '--' + (zItem.communicateEnd ? Utils.formatDate(Number(zItem.communicateEnd)) : '')
            zItem.selfMessage = zItem.communicateType
        } else if (zItem.type == 'other') {
            zItem.date_ = zItem.otherDate ? Utils.formatDate(Number(zItem.otherDate)) : ''
            zItem.selfDate = zItem.otherDate ? Utils.formatDate(Number(zItem.otherDate)) : ''
            zItem.selfMessage = zItem.note
            // zItem.selfDate = (zItem.date ? Utils.formatDate(Number(zItem.date)) : '') + '--' + (zItem.endDate ? Utils.formatDate(Number(zItem.endDate)) : '')
        }
        return zItem;
    }
    // 导入列表接口
    @action getNodesByDateWithTemplatePk(data, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getNodesByDateWithTemplatePk,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    let PkData = []
                    for (let item in data.content) {
                        let items = {
                            date: item,
                            data: data.content[item].map((zItem)=> {
                                zItem = that.updateItemData(zItem)
                                return zItem;
                            }),
                            columns: [
                                {type: 'double', id: 'money', label: '金额',columnClassName: 'col-xs-2', formatter: {format: '0,0.00'}},
                                {
                                    type: 'enum', id: 'type', label: '类型', columnClassName: 'col-xs-1',data: [
                                    {key: "travel", value: '交通'},
                                    {key: "hotel", value: '住宿'},
                                    {key: "eating", value: '餐饮'},
                                    {key: "communicate", value: '通信'},
                                    {key: "other", value: '其他'}
                                ]
                                },
                                {type: 'string', id: 'selfDate', label: '日期',columnClassName: 'col-xs-2'},
                                {type: 'string', id: 'tagContent', label: '标签',columnClassName: 'col-xs-3'},
                                {
                                    type: 'enum', id: 'category', label: '来源', columnClassName: 'col-xs-1',data: [
                                    {key: "ctrip_aircraft", value: '携程机票'},
                                    {key: "ctrip_aircraft_c", value: '携程机票'},
                                    {key: "ctrip_train", value: '携程火车票'},
                                    {key: "ctrip_train_c", value: '携程火车票'},
                                    {key: "mt_train", value: '美团火车票'},
                                    {key: "mt_train_c", value: '美团火车票'},
                                    {key: "dd_person_pay", value: '滴滴'},
                                    {key: "dd_company_pay", value: '滴滴'},
                                    {key: "sq_company_pay", value: '首汽'},
                                    {key: "sq_person_pay", value: '首汽'},
                                ]
                                },
                                {
                                    type: 'string', id: 'travelWay', label: '出行方式', columnClassName: 'col-xs-1'
                                },
                                {
                                    type: 'string', id: 'seat', label: '坐席', columnClassName: 'col-xs-1'
                                },

                                {
                                    type: 'enum', id: 'category', label: '企业支付',columnClassName: 'col-xs-1', data: [
                                    {key: "ctrip_aircraft", value: 'N'},
                                    {key: "ctrip_aircraft_c", value: 'Y'},
                                    {key: "ctrip_train", value: 'N'},
                                    {key: "ctrip_train_c", value: 'Y'},
                                    {key: "mt_train", value: 'N'},
                                    {key: "mt_train_c", value: 'Y'},
                                    {key: "dd_person_pay", value: 'N'},
                                    {key: "dd_company_pay", value: 'Y'},
                                    {key: "sq_company_pay", value: 'Y'},
                                    {key: "sq_person_pay", value: 'N'},
                                ]
                                },
                            ]
                        }
                        PkData.push(items)
                    }
                    that.getNodesByDateWithTemplatePkData = Object.assign([], PkData)
                    callback()
                    // console.log(JSON.stringify(that.getNodesByDateWithTemplatePkData));
                } else {
                    that.globalStore.showError(data.information ? data.information : "查询失败")
                    callback()
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
                callback()
            }
        })
    }
    @observable ExpenseKeyData = ''
    // 获取提交Key
    @action getSaveExpenseKey(data) {
        let that = this;
        $.ajax({
            type: "GET",
            url: Config.webreimburse.getSaveExpenseKey,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    that.ExpenseKeyData = data.information
                } else {
                    that.globalStore.showError(data.information ? data.information : "获取数据失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable checkStandardData = []
    // 获取提交Key
    @action checkStandard(data, callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.checkStandard,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    that.checkStandardData = Object.assign([], data.items)
                    callback(data.items)
                } else {
                    that.globalStore.showError(data.information ? data.information : "获取数据失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    // 提交单据
    @action saveNodeExpense1(data, callback , isUpdate) {
        let that = this;
        let config = Config.webreimburse.saveNodeExpense1;
        if(isUpdate){
            config = Config.webreimburse.updateExpenseInfo1
        }
        $.ajax({
            type: "POST",
            url: config,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    callback(0,data.expensePk)
                    // that.checkStandardData = Object.assign([],data.information)
                } else {
                    callback(1)
                    that.globalStore.showError(data.information ? data.information : "获取数据失败")
                }
            },
            error: (xhr, status, err) => {
                callback(1)
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @observable UserBankData = {}
    // 获取个人银行账号
    @action getUserBank(data) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getUserBank,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data.code == 0) {
                    that.UserBankData = Object.assign({},data.information)
                    // callback(0,data.expensePk)
                    // that.checkStandardData = Object.assign([],data.information)
                } else {
                    // callback(1)
                    that.globalStore.showError(data.information ? data.information : "获取数据失败")
                }
            },
            error: (xhr, status, err) => {
                // callback(1)
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
    @observable UserInfoData = []
    @action getUserInfo(data,callback) {
        let that = this;
        $.ajax({
            type: "POST",
            url: Config.webreimburse.getUserInfo,
            dataType: "json",
            data: JSON.stringify(data),
            // contentType: "application/x-www-form-urlencoded",
            contentType: "application/json",
            success: data => {
                if (data && data.code == 0) {
                    let cdata = [{id:data.information.deptPk,name:data.information.deptName},{id:data.information.usercode,name:data.information.userName}]
                    that.UserInfoData = Object.assign([],cdata)
                    callback(cdata)
                } else {
                    that.globalStore.showError(data.information ? data.information : "获取数据失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    //定义的列
    @observable BillTableColumn = {
        travel: [//出行
            {type: 'string', id: 'travelWay', label: '交通工具'},
            {type: 'string', id: 'fromCity_toCity', label: '路线'},
            {type: 'string', id: 'date_', label: '日期'},
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
            {
                type: 'enum', id: 'category', label: '来源', data: [
                {key: "ctrip_aircraft", value: '携程机票'},
                {key: "ctrip_aircraft_c", value: '携程机票'},
                {key: "ctrip_train", value: '携程火车票'},
                {key: "ctrip_train_c", value: '携程火车票'},
                {key: "mt_train", value: '美团火车票'},
                {key: "mt_train_c", value: '美团火车票'},
                {key: "dd_person_pay", value: '滴滴'},
                {key: "dd_company_pay", value: '滴滴'},
                {key: "sq_company_pay", value: '首汽'},
                {key: "sq_person_pay", value: '首汽'},
            ]
            },
            {
                type: 'enum', id: 'category', label: '企业支付', data: [
                {key: "ctrip_aircraft", value: 'N'},
                {key: "ctrip_aircraft_c", value: 'Y'},
                {key: "ctrip_train", value: 'N'},
                {key: "ctrip_train_c", value: 'Y'},
                {key: "mt_train", value: 'N'},
                {key: "mt_train_c", value: 'Y'},
                {key: "dd_person_pay", value: 'N'},
                {key: "dd_company_pay", value: 'Y'},
                {key: "sq_company_pay", value: 'Y'},
                {key: "sq_person_pay", value: 'N'},
            ]
            },
        ],
        hotel: [// 住宿
            {type: 'string', id: 'city', label: '地点'},
            {type: 'string', id: 'hotel', label: '酒店名称'},
            {type: 'string', id: 'startDate_endDate', label: '住宿日期'},
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
            {
                type: 'enum', id: 'category', label: '来源', data: [
                {key: "ctrip_inn", value: '携程酒店'},
                {key: "ctrip_inn_c", value: '携程酒店'}
            ]
            },
            {
                type: 'enum', id: 'category', label: '企业支付', data: [
                {key: "ctrip_inn", value: 'N'},
                {key: "ctrip_inn_c", value: 'Y'}
            ]
            },
        ],
        eating: [//餐饮
            {type: 'string', id: 'company', label: '餐饮公司'},
            {type: 'string', id: 'personNum', label: '人数'},
            {type: 'string', id: 'date_', label: '日期'},
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
            {
                type: 'enum', id: 'category', label: '来源', data: [
                {key: "red_fire", value: '红火台'},
                {key: "red_fire_c", value: '红火台'},
            ]
            },
            {
                type: 'enum', id: 'category', label: '企业支付', data: [
                {key: "red_fire", value: 'N'},
                {key: "red_fire_c", value: 'Y'},
            ]
            },
        ],
        buy: [//收款 暂定没有
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
        ],
        pay: [//付款 暂定没有
            {type: 'sting', id: 'payee', label: '收款单位'},
            {type: 'sting', id: 'payWay', label: '付款方式'},
            {type: 'sting', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'sting', id: 'payDate_', label: '付款日期'},
            {type: 'string', id: 'tagContent', label: '标签'},
        ],
        gather: [//采购 暂定没有
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
        ],
        sale: [//销售 暂定没有
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
        ],
        communicate: [//通信
            {type: 'string', id: 'communicateType', label: '通信类型'},
            {type: 'string', id: 'phoneNumber', label: '电话号码'},
            {type: 'string', id: 'communicateDate_', label: '费用期间'},
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'},
            {
                type: 'enum', id: 'category', label: '来源', data: [
                {key: "einvoice", value: '电子发票'}
            ]
            },
            {
                type: 'enum', id: 'category', label: '企业支付', data: [
                {key: "einvoice", value: 'N'}
            ]
            }
        ],
        other: [//其他
            {type: 'string', id: 'note', label: '说明'},
            {type: 'string', id: 'date_', label: '日期'},
            {type: 'double', id: 'money', label: '金额', formatter: {format: '0,0.00'}},
            {type: 'string', id: 'tagContent', label: '标签'}
        ]
    }


    @observable queryExpenseInfoData ={};
    @observable queryExpenseInfoDataInformation =[];
    @action queryExpenseInfo (param,callback){
        var that =this;
        that.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.bill.queryExpenseInfo,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            // contentType: "application/x-www-form-urlencoded",
            success: data => {
                that.globalStore.hideWait();
                if (data.code == 0) {
                    this.queryExpenseInfoData = Object.assign({}, data.information);
                    this.queryExpenseInfoDataInformation = Object.assign([], data.information.information.map((item)=> {
                        item.type = item.source_type.length > 2 ? item.source_type.substr(1, 1) : 0
                        item.typeTwo = item.source_type.length > 3 ? item.source_type.substr(2, 1) : 0
                        return item;
                    }))
                    if (typeof  callback == "function")
                        callback();
                } else {
                    that.globalStore.showError(data.message ? data.message : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                that.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }



    // 借款单  chenliw  2017年9月12日
    @observable getLoanBillTable = {};
    @observable getLoanBillModal =[];
    @observable getTableHead ={};
    @action loadLoanBillBodyTemplateInfo(param , callback ){
        var that =this;
        that.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.bill.loadLoanBillBodyTemplateInfo,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            success: data => {
                that.globalStore.hideWait();
                if (data.code == 0) {
                    that.getLoanBillModal = Object.assign([], data.jk_body_meta.map((item)=> {
                        item.type = item.source_type.length > 2 ? item.source_type.substr(1, 1) : 0
                        item.typeTwo = item.source_type.length > 3 ? item.source_type.substr(2, 1) : 0
                        return item;
                    }))

                    let tableList = {};
                    data.jk_body_meta.map((item)=>{
                        tableList[item.source_code] = "";
                        return tableList;
                    })
                    that.getLoanBillTable = Object.assign({},tableList)
                     // 返回数据示例： {dept:"部门"}
                    // name:列名称  code：列名称对应的字段（缺省 过滤掉不显示的） codeAll 列名称所有的字段
                    // ==> 转义后： name:["部门1"] code:["dept"] codeAll:["dept","dept2"]
                    // mustInput 必输字段
                    let tableHead ={} ,  name =[] ,code = [],codeAll=[], codeObj=[] , mustInput =[] ;
                    data.jk_body_meta.map((item)=>{
                        item.type = item.source_type.length > 2 ? item.source_type.substr(1, 1) : 0;

                        if(item.display =='true'){
                            name.push(item.source_name);
                            code.push(item.source_code);
                            codeObj.push({"sourceCode":item.source_code,"sourceType":item.type }) // 用于借款单列表中数据展示，判断哪些是参照
                        }
                        codeAll.push(item.source_code);

                        if(item.display =='true' && item.source_input ){
                            let m = {};
                            m.mustName = item.source_name ;
                            m.mustCode = item.source_code ;
                            mustInput.push(m);
                        }

                    })
                    tableHead.name = name ;
                    tableHead.code = code ;
                    tableHead.codeAll = codeAll ;
                    tableHead.codeObj = codeObj;
                    tableHead.mustInput = mustInput ;
                    that.getTableHead = Object.assign({} , tableHead );

                    if(typeof callback == 'function')
                        callback();
                } else {
                    that.globalStore.showError(data.message ? data.message : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                that.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取借款单详细信息（get请求，参数的pk是借款单表体pk）  应用场景：我的单据查看借款单详情
    @observable getLoanBodyData = [] ;
    @observable getLoanInformation =[];
    @observable getLoanOtherInformation = [];
    @action getLoanBillNode(param,callback){
        let that = this ;
        this.globalStore.showWait();
        $.ajax({
            type: "GET",
            url: Config.bill.getLoanBillNode,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            success: data => {
                this.globalStore.hideWait();
                if (data.code == 0) {
                    that.getLoanBodyData = Object.assign([],data.bodyData);
                    that.getLoanInformation  = Object.assign([],data.information.map((item)=> {
                        item.type = item.source_type.length > 2 ? item.source_type.substr(1, 1) : 0
                        item.typeTwo = item.source_type.length > 3 ? item.source_type.substr(2, 1) : 0
                        return item;
                    }));

                    that.getLoanOtherInformation = Object.assign([],data.otherInformation);
                    if (typeof callback == "function")
                        callback();
                } else {
                    that.globalStore.showError(data.message ? data.message : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @observable getRowsDetail =[];
    @action getLoanBillBodyInfo(param,callback){
        let that = this ;
        this.globalStore.showWait();
        $.ajax({
            type: "post",
            url: Config.bill.getLoanBillBodyInfo,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            success: data => {
                this.globalStore.hideWait();
                if (data.code == 0) {
                    this.getRowsDetail = Object.assign([],data.jk_body);
                    if (typeof callback == "function")
                        callback();
                } else {
                    that.globalStore.showError(data.message ? data.message : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    @action saveLoanBillNode(param,callback){
        let that = this ;
        this.globalStore.showWait();
        $.ajax({
            type: "post",
            url: Config.bill.saveLoanBillNode,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            success: data => {
                this.globalStore.hideWait();
                if (data.code == 0) {
                    if (typeof callback == "function")
                        callback();
                } else {
                    that.globalStore.showError(data.message ? data.message : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.hideWait();
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }
}
