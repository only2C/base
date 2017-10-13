/**
 * author: dangwei
 * date: 2017-08-18
 * mail: dangwei@yonyou.com
 * http://git.yonyou.com/sscplatform/fc_doc/blob/master/YBZ-proxyUser.md
 */
import {observable, action, computed} from 'mobx';
import Config from '../../config'
import GlobalStore from '../GlobalStore';
import React from 'react';
import Utils from '../../common/utils'
import $ from 'jquery';


export default class AdminAjaxStore {
  globalstore = GlobalStore;

  @observable DataListColumn = [
    {type: 'string', id: 'proxyName', label: '代理人'},
    {type: 'string', id: 'userName', label: '委托人'},
    {type: 'string', id: 'tsDate', label: '操作时间'}
  ];

  @observable WtDlListColumn = [
    {type: 'string', id: 'userName', label: '姓名'},
    {type: 'string', id: 'deptName', label: '部门'},
    {type: 'string', id: 'postName', label: '职务'}
  ];

  @observable UserListClumn = [
    {type: 'number', id: 'tableIndex', label: '序号'},
    {type: 'string', id: 'usercode', label: '员工编码'},
    {type: 'string', id: 'userName', label: '姓名'},
    {type: 'string', id: 'deptName', label: '部门'},
    {type: 'string', id: 'postName', label: '职务'}
  ];

  @observable TableData = [];

  // 获取左树的数据
  @action
  getTreeData(data, callback) {
    let that = this;
    that.globalstore.showWait();
    $.ajax({
      type: "POST",
      url: Config.agency.queryOtherUsersByCurrentUser,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalstore.hideWait();
        if (data.code == 0) {
          callback(data.data)
        } else {
          that.globalstore.showError(!data.errMsg ? data.information : data.errMsg, false);
        }
      },
      error: (xhr, status, err) => {
        that.globalstore.hideWait();
        that.globalstore.showError('数据请求失败,错误信息:' + err.toString());
      }
    });
  }

  // 查询  获取当前组织下所有的委托关系
  @action
  getTableData(data) {
    let that = this;
    that.globalstore.showWait();
    $.ajax({
      type: "POST",
      url: Config.agency.queryProxyUserByWebAdmin,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalstore.hideWait();
        that.TableData = Object.assign([], data.information.map((item)=> {
          item.tsDate = item.ts ? Utils.formatDate(item.ts) : '';
          return item;
        }));
      },
      error: (xhr, status, err) => {
        that.globalstore.hideWait();
        that.globalstore.showError('数据请求失败,错误信息:' + err.toString());
      }
    });
  }

  // 委托或者取消委托功能
  @action
  setOrCancelProxyByCurrentUser(data, callback) {
    let that = this;
    that.globalstore.showWait();
    $.ajax({
      type: "POST",
      url: Config.agency.SetOrCancelProxyByCurrentUser,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalstore.hideWait();
        if (data.code == 0) {
          callback(data.data)
        } else {
          that.globalstore.showError(!data.errMsg ? data.information : data.errMsg, false);
        }
      },
      error: (xhr, status, err) => {
        that.globalstore.hideWait();
        that.globalstore.showError('数据请求失败,错误信息:' + err.toString());
      }
    });
  }

  // 用于模糊查询当前用户可以设置的委托人
  @action
  queryProxyUserByContext(data, callback) {
    let that = this;
    that.globalstore.showWait();
    $.ajax({
      type: "POST",
      url: Config.agency.queryProxyUserByContext,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalstore.hideWait();
        callback(data);
        /*if (data.code == 0) {
          callback(data.data);
        } else {
          callback(data.data);
          //that.globalstore.showError(!data.errMsg ? data.information : data.errMsg, false);
        }*/
      },
      error: (xhr, status, err) => {
        that.globalstore.hideWait();
        that.globalstore.showError('数据请求失败,错误信息:' + err.toString());
      }
    });
  }

  // 获取当前登录的用户的手机号
  @action
  getPhone(callback) {
    $.ajax({
      type: "POST",
      url: Config.webreimburse.getPhone,
      //url: Config.agency.getPhone,
      dataType: "json",
      data: JSON.stringify({}),
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
}
