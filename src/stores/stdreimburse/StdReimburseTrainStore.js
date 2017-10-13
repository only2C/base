import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';
const serverUrl = Config.serverUrl;

class StandardReimburseStore {
    globalStore = GlobalStore;
    @observable fuserColumn = [
      {type: 'string', id: 'userid', label: '员工编码'},
      {type: 'string', id: 'userName', label: '姓名'},
      {type: 'string', id: 'deptName', label: '部门'},
      {type: 'string', id: 'rankName', label: '职级'},
      {type: 'string', id: 'postName', label: '职务'}
    ];
    JsonToList = ( value )=>{
        let result = [] ;
        if(!value || value.length == 0){
            return "";
        }
        value.map((v , i )=>{
            result.push(v.name);
        })
        return result ;
    }
    @observable DataListColumn=[]
    DataListColumns=[
      {type: 'string', id: 'id', 'label': 'id',hidden:true},
      {type: 'string', id: 'code', 'label': 'code',hidden:true},
      {type: 'string', id: 'name', 'label': '标准名称'},
      {type: 'string', id: 'policyexpensetype', 'label': '标准类型',formatter:{
          type: 'custom',
          callback:value => {return value.name}
      }},
      {type: 'string', id: 'seattype', 'label': '坐席',formatter:{
          type: 'custom',
          callback:value => this.JsonToList(value)
      }},
      {type: 'string', id: 'depts', 'label': '部门',formatter:{
          type: 'custom',
          callback:value => this.JsonToList(value)
       }
      },
      {type: 'string', id: 'posts', 'label': '职务',formatter:{
          type: 'custom',
          callback:value => this.JsonToList(value)
       }
      },
      {type: 'string', id: 'ranks', 'label': '职级',formatter:{
          type: 'custom',
          callback:value => this.JsonToList(value)
        }
      }
    ]
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
                if(item.id != 'depts'){
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
    @observable queryStandardDataParam ={
        "paras": {
            "policyexpensetype": ["train"]
        },
        "vaguequeryparam": "",
        "page":1,
        "pagenum":10
    };

    @observable queryStandardDataList =[] ;

    @observable queryTotalNum = [] ;

    @computed get getTrainDada (){
        return this.queryStandardDataList ;
    }

    @computed get getTrainPageNum (){
        return this.queryTotalNum
    }
    //火车
    @action
    queryTrain= ( callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse.querystandarddata,
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
    saveTrain = ( param , callback ) =>{
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse.savestandarddata,
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
    deleteTrain = ( param , callback) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse.delstandarddata,
            dataType: "json",
            contentType: "application/json",
            data:JSON.stringify(param ),
            success: data => {
                this.globalStore.hideWait();
                if (data.success) {
                    // this.checkoutData = Object.assign(this.checkoutData, data.data);
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
    updateTrain = ( param , callback ) => {
        this.globalStore.showWait();
        $.ajax({
            type: "POST",
            url: Config.stdreimburse.updatestandarddata,
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
        this.globalStore.trainEditData = data ;
    }


}
export  default StandardReimburseStore ;
