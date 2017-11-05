/**
 * 全局store, 在整个App的生命周期生存
 */
import {observable, computed, action} from 'mobx';
import  moment from "moment";
import Config from '../config';

class GlobalStore {
    //测试数据
    @observable name = 'test name';

    //全局缓存对象, 放置科目,参照等信息
    cache = {
        userName:"liucong",
        factoryId:"1"
    }

    //设置缓存
    setCache = (key, value) => {
        this.cache[key] = value;
    }

    //获取缓存
    getCache = (key) => {
        return this.cache[key];
    }

    //判断缓存是否存在
    isCache = (key) => {
        return this.cache[key] != undefined;
    }

    //当前凭证查询结果, 不需要绑定
    currentVoucherList = [];

    //提示信息
    @observable alertMsg = {
        message: '',
        alertVisible: false,
        type: "danger",//"success", "warning", "danger", "info"
        autoClose: false,
    };
    //提示信息
    @observable modelMsg = {
        message: '',
        bsSize: 'lg',
        modelVisible: false,
        hasCancel: false,
        cancelFn: null,
        sureFn: null
    };
    //提示信息
    @observable fixedMsg = {
        message: '',
        alertVisible: false,
        type: "success",//"success", "warning", "danger", "info"
        autoClose: true,
    };
    @observable showWaiting = {
        show: false,
        text: "加载中..."
    };

    //用弹窗的方式显示提示信息
    @action showModel(msg) {
        this.modelMsg = Object.assign(this.modelMsg, {
            message: msg,
            modelVisible: true,
            hasCancel: false,
            cancelFn: null,
            sureFn: null
        });
    }

    //用弹窗的方式显示提示信息
    @action showCancelModel(msg, cancelFn, sureFn) {
        this.modelMsg = Object.assign(this.modelMsg, {
            message: msg,
            modelVisible: true,
            hasCancel: true,
            cancelFn: cancelFn,
            sureFn: sureFn
        });
    }

    口

    /**
     * 标准化 提示窗
     * @chenliw 2017-10-10 重构
     * @param msg   消息集合
     * @param bsSize  参考https://react-bootstrap.github.io/components.html#overlays
     * @param cancelFn  如有 取消函数 ,则有取消按钮
     * @param sureFn  确认函数
     * @param timerFn  是否定时关闭，默认是三秒后定时关闭
     *
     * 按需进行扩展 ，原则上不对之前的代码进行修改
     */

    @action showTipsModal(msg, bsSize, cancelFn, sureFn ,timerFn) {

        let message ={
            message: msg,
            bsSize: bsSize,
            modelVisible: true,
            hasCancel: false,
            cancelFn: null,
            sureFn: sureFn
        };

        // 取消按钮存在
        if (typeof cancelFn == "function") {
            message ={
                message: msg,
                bsSize: bsSize,
                modelVisible: true,
                hasCancel: true,
                cancelFn: cancelFn,
                sureFn: sureFn
            };
        }

        this.modelMsg = Object.assign(this.modelMsg, message)
    }

    //显示普通提示信息
    @action showInfo(msg) {
        this.alertMsg = Object.assign(this.alertMsg, {
            message: msg,
            type: 'success',
            autoClose: true,
            alertVisible: true
        });
        if (this.alertMsg.autoClose) {
            setTimeout(() => {
                this.alertMsg = Object.assign(this.alertMsg, {message: '', alertVisible: false});
            }, 3000);
        }
    }

    //显示错误提示信息
    @action showError(msg, isShow) {
        let autoClose = true
        if (!isShow) {
            autoClose = false;
        }
        this.alertMsg = Object.assign(this.alertMsg, {

            message: msg,
            type: 'danger',
            autoClose: autoClose,
            alertVisible: true
        });
        if (this.alertMsg.autoClose) {
            setTimeout(() => {
                this.alertMsg = Object.assign(this.alertMsg, {message: '', alertVisible: false});
            }, 3000);
        }
    }

    //隐藏提示信息
    @action hideAlert() {
        this.alertMsg = Object.assign(this.alertMsg, {message: '', alertVisible: false});
    }

    //显示不被路由删除的信息
    @action showFixed(msg) {
        this.fixedMsg = Object.assign(this.fixedMsg, {
            message: msg,
            alertVisible: true
        });
        if (this.fixedMsg.autoClose) {
            setTimeout(() => {
                this.fixedMsg = Object.assign(this.fixedMsg, {message: '', alertVisible: false});
            }, 3000);
        }
    }

    //隐藏不被路由删除的信息
    @action hideFixed() {
        this.fixedMsg = Object.assign(this.fixedMsg, {message: '', alertVisible: false});
    }

    //显示等待遮罩
    @action showWait() {
        this.showWaiting = Object.assign(this.showWaiting, {show: true});
        //超时自动关闭
        // setTimeout(() => {
        //     this.showWaiting = Object.assign(this.showWaiting, {show:false});
        // }, 20000);
    }

    //隐藏等待遮罩
    @action hideWait() {
        this.showWaiting = Object.assign(this.showWaiting, {show: false});
    }


    trainEditData = [];

    get getTrainEditData() {
        return this.trainEditData;
    }

    /** webreimburse 参数说明
     *  travel 交通  ， hotel 住宿  ，other 其他 ， eating 餐饮   communicate 通讯
     *  数据格式：eg:
     *   [{data:{...返回的数据} }]
     *   取值方式  let result =  globalStore.getWebReimburse ;
     */

    webreimburse = [];

    get getWebReimburse() {
        return this.webreimburse
    }


    constructor() {

        // console.log(this.getDefaultAcc);
    };


}

export default new GlobalStore();
