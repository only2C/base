/**
 * 友报账web-申请规则
 * author:zhangtongchuan
 * date: 2017-07-27
 * mail: zhangtch@yonyou.com
 * api:http://git.yonyou.com/sscplatform/fc_doc/blob/master/controlRules.md
 */
import {observable,action,computed} from 'mobx';
import Config from '../../config'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

// let serverUrl = 'http://127.0.0.1'
// Config.sq.getLoanBillItemInformation= serverUrl + '/sq/getLoanBillItemInformation' // 申请单服务 添加的时候获取模板
// Config.sq.saveBusinessTripNodeNew = serverUrl + '/sq/saveBusinessTripNodeNew' //添加保存接口
// Config.sq.updateBusinessTripNodeNew = serverUrl + '/sq/updateBusinessTripNodeNew' // 修改保存接口
// Config.sq.getBusinessTripNodeList = serverUrl + '/sq/getBusinessTripNodeList' // 申请单列表
// Config.sq.getBusinessTripNode = serverUrl + '/sq/getBusinessTripNode' //根据pk加载单据
// Config.sq.recoveryNodeBusTripBill = serverUrl + '/sq/recoveryNodeBusTripBill' //根据pk收回单据
// Config.sq.closeApplicationForm = serverUrl + '/sq/closeApplicationForm' //关闭单据
// Config.sq.getNodesByBillPk = serverUrl + '/sq/getNodesByBillPk' //通过申请单pk查询记事
// Config.sq.atcRefJSON = serverUrl + '/nodebillpay/referJSON' //通过申请单pk查询记事
// Config.sq.atcRefJSON2 = serverUrl + '/nodebillpay/referJSON' //通过申请单pk查询记事
// Config.sq.getBillType = serverUrl + '/sq/getBillType' //单据类型查询
// Config.sq.openBillByPk = serverUrl + '/sq/openBillByPk' //单据类型查询

export default class SqStore {
  globalStore = GlobalStore;
  //添加的时候获取模板
  @action getAddTemplate(data,callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.sq.getLoanBillItemInformation,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data)
        }else{
          callback(undefined)
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback([])
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }

  @action saveBusinessTripNodeNewFun(data,callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.sq.saveBusinessTripNodeNew,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data)
        }else{
          callback(undefined)
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback([])
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
  @action getBillType(data, callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.sq.getBillType,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data.information)
        }else{
          callback([])
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback([])
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
  @action getBusinessTripNodeList(data, callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "GET",
      url: Config.sq.getBusinessTripNodeList,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data.information)
        }else{
          callback([])
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback([])
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
  @action openBillByPk(data, callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "GET",
      url: Config.sq.openBillByPk,
      dataType: "json",
      contentType: "application/json",
      data: data,
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data)
        }else{
          callback(undefined)
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback(undefined)
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
  //根据pk收回单据
  @action recoveryNodeBusTripBill(data, callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "GET",
      url: Config.sq.recoveryNodeBusTripBill,
      dataType: "json",
      contentType: "application/json",
      data: data,
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data)
        }else{
          callback(undefined)
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback(undefined)
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
  //关闭单据
  @action closeApplicationForm(data, callback){
    var that = this;
    that.globalStore.showWait();
    $.ajax({
      type: "GET",
      url: Config.sq.closeApplicationForm,
      dataType: "json",
      contentType: "application/json",
      data: data,
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===0) {
          callback(data)
        }else{
          callback(undefined)
          this.globalStore.showError('数据请求失败');
        }
      },
      error: (xhr, status, err) => {
        callback(undefined)
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }

}
