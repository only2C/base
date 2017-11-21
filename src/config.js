//调用java api的url

var serverUrl = process.env.SERVER;
if(window.SERVICESURL!=''){
  serverUrl = window.SERVICESURL
}
var Config = {
    serverUrl:serverUrl,
     bossBill:{
         userReg:serverUrl + '/user/reg', //用户注册
         userExsisted:serverUrl + '/user/email', //邮箱验证
         userLogin:serverUrl + '/user/login', //用户登录
         upPwd:serverUrl + '/user/updpwd',// 修改密码
         orderAdd:serverUrl + '/order/add', // 新增订单
         orderSave:serverUrl + '/order/basic/save', //保存订单
         queryOrderList:serverUrl+'/order/find', //查询订单列表
         saveSizes:serverUrl + '/order/size/save',  // 保存尺码信息
         saveOrderImg:serverUrl + '/order/img/save', //保存订单图片信息
         saveColth:serverUrl + '/order/colth/save', //保存订单布款信息
         saveSubmaterial:serverUrl +'/order/submaterial/save', //保存订单辅料信息
         saveTech:serverUrl +'/order/tech/save', //保存订单工艺信息
         saveSelfwork:serverUrl + '/order/selfwork/save' , //保存本厂加工信息
         saveOutwork:serverUrl + '/order/outwork/save' , //保存外发加工信息
         saveOutTech:serverUrl + '/order/outtech/save',//保存外发工艺信息
         saveDeliver:serverUrl +'/order/deliver/save', //保存订单工艺信息
         upload:serverUrl + '/comm/upload',  //上传
         queryClientList:serverUrl + '/order/client/all' , //查询客户列表
         getSizeDefault:serverUrl + '/order/size/default',  //获取基础尺码
         queryOutfactory:serverUrl + '/outfac/find',   //获取外发工厂
         queryOutfactoryItem:serverUrl +'/outfac/findItem',  //获取外发工厂项目
         queryOuttechItem:serverUrl +'/outfac/findTech',  //获取外发工艺项目
         addWorker:serverUrl +'/salary/addWorker',  // 新增工人
         addWork:serverUrl +'/salary/addProfession',  // 新增工种
         addSalary:serverUrl +'/salary/addSalary',  // 新增工资
         queryAllWorker:serverUrl +'/salary/findWorker' , //查找所有工人
         queryAllWork:serverUrl + '/salary/findProfession' , //查找所有工种
         queryAllSalary:serverUrl + '/salary/findSalary',  //查询列表
         addIncome:serverUrl + '/income/add' , //新增收款
         addIncomeClient:serverUrl + '/income/addClient' , //新增收款客户
         queryIncome:serverUrl + '/income/find' , //查询收款
         queryIncomeClient:serverUrl + '/income/getClients' , //获取收款客户
         queryOrderDetail:serverUrl+'/order/detial' ,  //查询单据详情

     }


};

export default Config;
