//调用java api的url

var serverUrl = process.env.SERVER;
if(window.SERVICESURL!=''){
  serverUrl = window.SERVICESURL
}

var Config = {

     bossBill:{
         userReg:serverUrl + '/client/reg', //用户注册
         userExsisted:serverUrl + '/userExsisted', //邮箱验证
         userLogin:serverUrl + '/client/login', //用户登录
         upPwd:serverUrl + '/client/updpwd',// 修改密码
         queryOrderList:serverUrl+'/queryOrderList', //查询订单列表
         upload:serverUrl + '/upload',  //上传
         queryClientList:serverUrl + '/queryClientList' , //查询客户列表
         saveOrderBase:serverUrl + '/saveOrderBase' , //确定订单基本信息
         getSizeBase:serverUrl + '/getSizeBase',  //获取基础尺码
         saveOrderSizes:serverUrl + '/saveOrderSizes',  // 保存尺码信息
     }
    /*refer:{
        referDataUrl:serverUrl+'/refbase_ctr/queryRefJSON', //refer 其他参照，调用refbase_ctr/queryRefJSON 10.3.14.240
        referDataUserUrl:serverUrl+'/refbase_ctr/queryRefUserJSON', //人员参照API
        referSassAndNc:serverUrl+'/node/queryRefJSON'
    },
    stdreimburse:{
        querystandarddata:serverUrl+'/nodeexpensestandard/querystandarddata' +requestHeader, // 查询报销标准数据接口
        savestandarddata:serverUrl+'/nodeexpensestandard/savestandarddata'+requestHeader,   //保存
        delstandarddata:serverUrl +'/nodeexpensestandard/deletestandarddata'+requestHeader,  //删除
        updatestandarddata:serverUrl +'/nodeexpensestandard/updatestandarddata'+requestHeader,  //更新 or  编辑
        referranksUrl:serverUrl +'/dutyLevel/findAll',   // 职级参照
        referpostsUrl:serverUrl +'/duty/findAll',        // 职务参照
        filternodeexpensestandarduser:serverUrl +'/filternodeexpensestandard/user', //用户查询
        systemIsNc:serverUrl +'/node/systemIsNc', //1:nc系统   0:saas 系统
    },
    stdreimburse2:{
        querystandarddata2:serverUrl+'/nodeexpensestandard2/querystandarddata2' +requestHeader, // 查询报销标准数据接口
        savestandarddata2:serverUrl+'/nodeexpensestandard2/savestandarddata2'+requestHeader,   //保存
        delstandarddata2:serverUrl +'/nodeexpensestandard2/deletestandarddata2'+requestHeader,  //删除
        updatestandarddata2:serverUrl +'/nodeexpensestandard2/updatestandarddata2'+requestHeader,  //更新 or  编辑
        referusersUrl:serverUrl +'/userCenter/query2', // 用户参照
        referreimbursebillsUrl:serverUrl +'/billtype2/query2?type=bx' // 报销单参照
    },
    validation:{
        savevalidationdata:serverUrl+'/validation/savevalidationdata'+requestHeader,   //保存
        queryvalidationdata:serverUrl+'/validation/queryvalidationdata'+requestHeader,   //保存
        updatevalidationdata:serverUrl +'/validation/updatevalidationdata'+requestHeader,  //更新 or  编辑
        deletevalidationdata:serverUrl+'/validation/deletevalidationdata'+requestHeader,
        referbillsUrl:serverUrl +'/nodeBilltype2/findAll',      // 职务参照
        refertypesUrl:serverUrl +'/nodedoctype/findAll',   // 类型
        refercodesUrl:serverUrl +'/nodevalidacodes/findAll'  // 项目编码
        // refercodesUrl:'https://ybz.yonyoucloud.com/feeitem/query' ,
    },
    bill:{
      queryDetailsData:serverUrl+'/billinfo/getBillInfo'+requestHeader,
      WFHISBYBUSINESSKEY:serverUrl+'/bpm/wfhisByBusinessKey',  // 我的单据流程历史
      approve:serverUrl+'/bpm/approve', //审批 批准
      reduction:serverUrl+'/node/reduction', //报销单核减金额
      recoveryExpenseBill:serverUrl+'/nodeexpense/recoveryExpenseBill',
      deleteBill:serverUrl+'/nodeexpense/deleteExpenseInfo',
      loadLoanBillBodyTemplateInfo:serverUrl+'/nodeLoanBill/loadLoanBillBodyTemplateInfo', //填写借款单时点击“添加借款明细”时调用该方法
      getLoanBillNode:serverUrl+ '/nodeLoanBill/getLoanBillNode' , //获取借款单详细信息
      getLoanBillBodyInfo:serverUrl + '/nodeLoanBill/getLoanBillBodyInfo' , //获取借款明细的详细信息 新增借款单时添加完借款明细后查看借款明细；我的单据中查看借款明细
      saveLoanBillNode:serverUrl +'/nodeLoanBill/saveLoanBillNode' ,  // 新增借款单提交时保存
      updateLoanBillNode:serverUrl+'/nodeLoanBill/updateLoanBillNode' ,  //我的单据修改借款单后提交时更新
    },
    systemIntegration: {
      getOsType:serverUrl + '/userCenter/getRegisterInfo', // 获取用户信息
      saveErpRegister:serverUrl + '/userCenter/saveErpRegister', // U8/9 /nc 注册
      syncDept:serverUrl+'/basicFile/syncDept', //门同
      syncProject:serverUrl+'/basicFile/syncProject', //项目
      syncProjectClass:serverUrl+'/basicFile/syncProjectClass', //
      cancelSync:serverUrl+'/basicFile/cancelSync'
    },
    webreimburse: {
      saveTravelNode: serverUrl + '/nodeTravel/saveTravelNode'+ requestHeader, //交通新增
      updateTravelNode:serverUrl + '/nodeTravel/updateTravelNode'+ requestHeader, // 交通修改
      saveHotelNode:serverUrl + '/nodeHotel/saveHotelNode'+ requestHeader, // 住宿新增
      updateHotelNode:serverUrl + '/nodeHotel/updateHotelNode'+ requestHeader, //住宿修改
      saveEatingNode:serverUrl + '/nodeEating/saveEatingNode'+ requestHeader, // 餐饮新增
      updateEatingNode:serverUrl + '/nodeEating/updateEatingNode'+ requestHeader, // 餐饮修改
      saveCommunicateNode:serverUrl + '/nodeCommunicate/saveCommunicateNode'+ requestHeader, // 通讯新增
      updateCommunicateNode:serverUrl + '/nodeCommunicate/updateCommunicateNode'+ requestHeader, //通讯修改
      saveOtherNode:serverUrl + '/nodeOther/saveOtherNode'+ requestHeader, // 其他新增
      updateOtherNode:serverUrl + '/nodeOther/updateOtherNode'+ requestHeader, //其他修改
      getNodeRefs:serverUrl+'/node/getNodeRefs'+ requestHeader , //查询标明哪类记事包含哪个参照类型参数的接口
      queryRefItem:serverUrl+'/node/queryRefJSON' + requestHeader, //查询参照值的接口
      getBillType:serverUrl+'/common/getBillType'+ requestHeader, //获取全部单据类型
      getLoanBillItemInformation:serverUrl+'/node/getLoanBillItemInformation'+ requestHeader, // 获取表头信息
      getNodesByDateWithTemplatePk:serverUrl+'/node/getNodesByDateWithTemplatePk'+ requestHeader, //导入列表接口
      getSaveExpenseKey:serverUrl+'/node/getSaveExpenseKey'+ requestHeader, //获取提交Key
      getSeat:serverUrl + '/bookkeeping/getSeat' +requestHeader , //获取座次信息
      saveNodeExpense1:serverUrl+'/node/saveNodeExpense1'+ requestHeader, // 提交单据
      checkStandard:serverUrl+'/bookkeeping/checkStandard'+ requestHeader, //超标验证
      webReferUrl:serverUrl+'/node/queryRefJSON'+ requestHeader ,
      updateFile:serverUrl + '/node/updateFile' +requestHeader , //文件上传
      uploadWebFile:serverUrl + '/node/uploadWebFile', // 文件上传 2
      getPhone:serverUrl + '/node/getPhone' ,  //获取电话号码
      getUserBank:serverUrl + '/node/getUserBank', // 获取个人银行账号
      getUserInfo:serverUrl + '/user/userInfo', //获取用户信息
      updateExpenseInfo1:serverUrl + '/nodeexpense/updateExpenseInfo1'
    },
    sqrules: {
      query: serverUrl + '/nodeControlRules/query',
      save: serverUrl + '/nodeControlRules/save',
      getBillType: serverUrl + '/nodeControlRules/getBillType',
      queryRefJSON: serverUrl + '/nodeControlRules/queryRefJSON',
      getUserBank:serverUrl + '/node/getUserBank', // 获取个人银行账号
    },
    announcement: {
      query: serverUrl +'/announcement/getlist',
      save: serverUrl + '/announcement/save',
      retrieve: serverUrl + '/announcement/getsingle',
      publish: serverUrl + '/announcement/publish',
      recall: serverUrl + '/announcement/recall',
    },
    notice: {
      query: serverUrl +'/notice/getlist',
      save: serverUrl + '/notice/save',
      retrieve: serverUrl + '/notice/getsingle',
      publish: serverUrl + '/notice/publish',
      recall: serverUrl + '/notice/recall',
    },
    agency: {   // web代理授权
        queryProxyUserByWebAdmin: serverUrl + '/Proxybx/queryProxyUserByWebAdmin', // 获取当前组织的委托关系
        SetOrCancelProxyByCurrentUser: serverUrl + '/Proxybx/SetOrCancelProxyByCurrentUser', // 委托或取消委托关系
        queryProxyUserByContext: serverUrl + '/Proxybx/queryProxyUserByContext',
        queryOtherUsersByCurrentUser: serverUrl + '/Proxybx/queryOtherUsersByCurrentUser'
    },
    sq: { // 申请单
      getLoanBillItemInformation: serverUrl + '/node/getLoanBillItemInformation', // 申请单服务 添加的时候获取模板
      saveBusinessTripNodeNew: serverUrl + '/nodeBusinessTrip/saveBusinessTripNodeNew', //添加保存接口
      updateBusinessTripNodeNew: serverUrl + '/nodeBusinessTrip/updateBusinessTripNodeNew', // 修改保存接口
      getBusinessTripNodeList: serverUrl + '/nodeBusinessTrip/getBusinessTripNodeList', // 申请单列表
      getBusinessTripNode: serverUrl + '/nodeBusinessTrip/getBusinessTripNode', //根据pk加载单据
      recoveryNodeBusTripBill: serverUrl + '/nodeBusinessTrip/recoveryNodeBusTripBill', //根据pk收回单据
      closeApplicationForm: serverUrl + '/application/closeApplicationForm', //关闭单据
      getNodesByBillPk: serverUrl + '/application/getNodesByBillPk', //通过申请单pk查询记事
      atcRefJSON: serverUrl + '/node/queryRefJSON', // airplane：飞机，train：火车，cityarchive：城市
      atcRefJSON2: serverUrl + '/refbase_ctr/queryRefJSON',
      getBillType: serverUrl + '/common/getBillType', //单据类型查询
      openBillByPk: serverUrl + '/nodeBusinessTrip/openBillByPk', // 根据pk加载单据（单据数据和单据模块数据）
    }*/

};

export default Config;
