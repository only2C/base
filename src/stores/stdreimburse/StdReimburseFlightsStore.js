/**
 * author:zhangtongchuan
 * date: 2017-05-15
 * mail: zhangtch@yonyou.com
 */
import {observable,action,computed} from 'mobx';
import Config from '../../config'
import  GlobalStore from '../GlobalStore';
import React from 'react';
import $ from 'jquery';

export default class StandardReimburseFlightsAjaxStore{
  globalStore = GlobalStore;

  @observable fuserColumn = [
    {type: 'string', id: 'userid', label: '员工编码'},
    {type: 'string', id: 'userName', label: '姓名'},
    {type: 'string', id: 'deptName', label: '部门'},
    {type: 'string', id: 'rankName', label: '职级'},
    {type: 'string', id: 'postName', label: '职务'}
  ];

  @observable fuserDataList = []
  @action
  getfilternodeexpensestandarduser(data){
    let that =this;
    if(data.isflag){
      that.fuserDataList = Object.assign([])
      return
    }
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.filternodeexpensestandarduser,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: data => {
          that.fuserDataList = Object.assign([], data.users)
        },
        error: (xhr, status, err) => {
            // that.globalStore.hideWait();
            // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
  }

  @observable queryStandardDataParame = {
    "paras": {
         "policyexpensetype": ["airplane"]  //policyexpensetype_airplane 政策性标准-机票,policyexpensetype_train,政策性标准-火车票,policyexpensetype_stay,政策性标准-住宿,policyexpensetype_ship,政策性标准-轮船
    },
    "vaguequeryparam": "",
    "page": 1, //不支持分页可以先设置为空。
    "pagenum": 10
  }
  @observable queryStandardDataList = [];
  @observable DataListColumn=[]
  DataListColumns=[
    {type: 'string', id: 'name', label: '标准名称'},
    {type: 'string', id: 'policyexpensetypeName', label: '标准类型'},
    {type: 'string', id: 'seattypeName', label: '等级标准'},
    {type: 'string', id: 'deptsName', label: '部门'},
    {type: 'string', id: 'postsName', label: '职务'},
    {type: 'string', id: 'ranksName', label: '职级'},
    // <Col className="flights-th" xs={2}></Col>
    // <Col className="flights-th" xs={2}></Col>
    // <Col className="flights-th" xs={2}></Col>
    // <Col className="flights-th" xs={2}></Col>
    // <Col className="flights-th" xs={2}></Col>
    // <Col className="flights-th" xs={2}></Col>
  ]

  @observable FlightsList = [
    {id:"plane_01",name:"头等舱"},
    {id:"plane_02",name:"商务舱"},
    {id:"plane_03",name:"经济舱"}
  ]


  @observable items = 1;

  @observable activePage = 1;

  @observable deptsIsShow = true
  @action systemIsNc(){
    let that = this
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.systemIsNc,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: data => {
          if(Number(data.code)===1){
            let DataListColumn = []
            that.DataListColumns.forEach((item,index)=>{
              if(item.id != 'deptsName'){
                DataListColumn.push(item)
              }
            })
            that.DataListColumn = Object.assign([],DataListColumn)
            that.deptsIsShow = false
          }else{
            that.DataListColumn = Object.assign([],that.DataListColumns)
            that.deptsIsShow = true
          }
        },
        error: (xhr, status, err) => {
        }
      })
  }
  //查询接口
  @action
  queryStandardData(){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.querystandarddata,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(this.queryStandardDataParame),
        // contentType: "application/x-www-form-urlencoded",
        // data: this.queryStandardDataParame,
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryStandardDataList = Object.assign([],data.data.map((item)=>{
              item.policyexpensetypeName = item.policyexpensetype&&item.policyexpensetype.name ? item.policyexpensetype.name : '';
              let seattype =  item.seattype ? item.seattype.map((p)=>{
                return p.name
              }) : []
              let depts = item.depts ? item.depts.map((p)=> {
                return p.name
              }) : [];
              let posts = item.posts ? item.posts.map((p)=> {
                return p.name
              }) : [];
              let ranks = item.ranks ? item.ranks.map((p)=> {
                return p.name
              }) : [];
              item.seattypeName = seattype.join(',');
              item.deptsName = depts.join(',');
              item.postsName = posts.join(',');
              item.ranksName = ranks.join(',');
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
            that.queryStandardData();
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
  saveStandardData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.savestandarddata,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: data => {
          that.globalStore.hideWait();
          if (data.success) {
            that.queryStandardData();
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
            that.queryStandardData();
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

  //仓位
  /*@action
  getList(data){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.bx.FlightsGetList,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (data.success) {
          that.FlightsList=Object.assign([],data.data);
        }else{
          that.globalStore.showError(data.message?data.message:"获取失败")
        }
      },
      error: (xhr, status, err) => {
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }*/

}
