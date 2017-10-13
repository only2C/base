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

export default class SqRulesStore{
  globalStore = GlobalStore;
  @observable data = [];
  @action getQuery(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.sqrules.query,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===1) {
          callback(data.data)
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

  @action save(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.sqrules.save,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (Number(data.code)===1) {
          callback(data)
        }else{
          callback({})
          this.globalStore.showError('保存数据失败');
        }
      },
      error: (xhr, status, err) => {
        callback({})
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }
}
