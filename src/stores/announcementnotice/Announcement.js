/**
 * author:zhangtongchuan
 * date: 2017-05-15
 * mail: zhangtch@yonyou.com
 */
import {observable,action,computed} from 'mobx';
import Config from '../../config'
import  GlobalStore from '../GlobalStore';
import React from 'react';

export default class Announcement{
  globalStore = GlobalStore;

  @observable queryParame = {
    "pageNum": 1, //不支持分页可以先设置为空。
    "pageSize": 10
  }
  @observable queryDataList = [];

  @observable DataListColumn=[
    {type: 'string', id: 'pk_announcement', label: '主键', hidden: true},
    {type: 'string', id: 'title', label: '公告标题'},
    {type: 'string', id: 'author', label: '公告发布者'},
    {type: 'string', id: 'createtime', label: '保存时间'},
    {type: 'string', id: 'publishtime', label: '发布时间'},
    {type: 'enum', id: 'state', label: '发布状态',data:[
      {key:0,value:'未发布'},
      {key:1,value:'已发布'},
    ]},
  ]


  @observable items = 1;

  @observable activePage = 1;

  //查询接口
  @action
  queryData(){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.announcement.query,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(this.queryParame),
        // contentType: "application/x-www-form-urlencoded",
        // data: this.queryStandardDataParame,
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryDataList = Object.assign([],data.data.map((item)=>{

              item.publishtime = item.publishtime ? item.publishtime : '未发布';
              return item;
            }))
            that.items=Math.ceil(data.totalnum/data.pagenum)
            that.activePage = data.page
          }else{
              that.globalStore.showError(data.message?data.message:"查询失败")
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
    }

  //删除接口
  @action
  deleteStandardData(data){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.delstandarddata,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        // contentType: "application/x-www-form-urlencoded",
        // data: data, //{standardids:[pk1]}
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryData();
          }else{
              that.globalStore.showError(data.message?data.message:"查询失败")
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
    }

  //保存
  @action
  saveData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.announcement.save,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryData();
            callback(1)
          }else{
              that.globalStore.showError(data.message?data.message:"保存失败")
              callback(0)
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            callback(0)
        }
      })
  }

  //更新
  @action
  updateStandardData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.updatestandarddata,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryData();
            callback(1)
          }else{
              that.globalStore.showError(data.message?data.message:"更新失败")
              callback(0)
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            callback(0)
        }
      })
  }
  @action
  retrieveData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.announcement.retrieve,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            callback(data);
          }else{
              that.globalStore.showError(data.message?data.message:"加载数据失败")
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            callback(0)
        }
      })
  }

  //发布
  @action
  publish(data){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.announcement.publish,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryData();
          }else{
              that.globalStore.showError(data.message?data.message:"发布失败")
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
  }

  //撤回
  @action
  recall(data){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.announcement.recall,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryData();
          }else{
              that.globalStore.showError(data.message?data.message:"撤回失败")
          }
        },
        error: (xhr, status, err) => {
            that.globalStore.hideWait();
            this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
  }

}
