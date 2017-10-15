import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class BossBillStore {

    globalStore = GlobalStore;

    @observable orderListGather=[];
    @observable orderListOrders =[];
    @observable orderListPage ={};
    @action queryOrderList(param , callback ){
        let that = this;
        let data = {
            "queryTS":"2017-8",
            "client":{
                "id":0,
                "name":"全部客户"
            },
            "gather":[
                {
                    "name":"下单数",
                    "number":192,
                    "type":1
                },
                {
                    "name":"总件数",
                    "number":192,
                    "type":1
                },
                {
                    "name":"接单额",
                    "number":192,
                    "type":1
                },
                {
                    "name":"已收款",
                    "number":192,
                    "type":1
                },
                {
                    "name":"欠收款",
                    "number":192,
                    "type":1
                },
                {
                    "name":"逾期款",
                    "number":192,
                    "type":2
                },
                {
                    "name":"出货数",
                    "number":192,
                    "type":1
                },
                {
                    "name":"件数差",
                    "number":192,
                    "type":1
                },
                {
                    "name":"毛利润",
                    "number":192,
                    "type":3
                }
            ],
            "orders":[
                {
                    "id":1,
                    "SKU":"123123",
                    "clientName":"张三",
                    "order_num":134,
                    "out_num":2000,
                    "order_price":203,
                    "order_diffnum":{
                        "number":200,
                        "type":1
                    },
                    "order_maretialprice":{
                        "number":134,
                        "type":1
                    },
                    "order_submaterial":{
                        "number":200,
                        "type":2
                    }
                },
                {
                    "id":2,
                    "SKU":"123123",
                    "clientName":"张三",
                    "order_num":134,
                    "out_num":2000,
                    "order_price":203,
                    "order_diffnum":{
                        "number":200,
                        "type":1
                    },
                    "order_maretialprice":{
                        "number":134,
                        "type":1
                    },
                    "order_submaterial":{
                        "number":200,
                        "type":2
                    }
                },
                {
                    "id":3,
                    "SKU":"123123",
                    "clientName":"张三",
                    "order_num":134,
                    "out_num":2000,
                    "order_price":203,
                    "order_diffnum":{
                        "number":200,
                        "type":1
                    },
                    "order_maretialprice":{
                        "number":134,
                        "type":1
                    },
                    "order_submaterial":{
                        "number":200,
                        "type":2
                    }
                }
            ],
            "Pager":{
                "current_page":1,
                "totalPages":20
            }
        }

        this.orderListGather = Object.assign([],data.gather);
        this.orderListOrders = Object.assign([],data.orders);
        this.orderListPage = Object.assign({},data.Pager)

       /* $.ajax({
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
        })*/
    }

}