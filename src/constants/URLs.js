/**
 * 配置后端服务器的IP和端口
 * 可以通过在生产环境中创建`config.js`文件，来覆盖这些配置。
 * config.js举例
 * ```
 * G_SCHEME = 'https';
 * G_HOST_PORT = 'fi2.yonyoucloud.com';
 * G_PATH_PREFIX = '/ficloud2';
 * ```
 * Thanks Devin Chen
 */

const { NODE_ENV } = process.env;

const DEFAULT_SCHEME = NODE_ENV === 'production'
  ? 'https' // 默认使用友报账服务器，这也是ssc30-admin一开始就为了这个产品开发的
  : 'http'; //
const DEFAULT_HOST_PORT = NODE_ENV === 'production'
  ? 'ybz.yonyoucloud.com'
  : '8082';
const DEFAULT_PATH_PREFIX = NODE_ENV === 'production'
  ? ''
  : '';

export const SCHEME = typeof G_SCHEME === 'undefined'
  ? DEFAULT_SCHEME
  : G_SCHEME;
export const HOST_PORT = typeof G_HOST_PORT === 'undefined'
  ? DEFAULT_HOST_PORT
  : G_HOST_PORT;
export const PATH_PREFIX = typeof G_PATH_PREFIX === 'undefined'
  ? DEFAULT_PATH_PREFIX
  : G_PATH_PREFIX;

// scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]
const makeURL = path => `${SCHEME}://${HOST_PORT}${PATH_PREFIX}${path}`;

/**
 * 通用接口
 */

const urlParam = '';
//const urlParam = '?phone=13920171111&tenantId=ot85sl3q';


//报销标准
export const stdremburese = {};
  stdremburese.querystandarddata = makeURL('/nodeexpensestandard/querystandarddata'+urlParam);
  stdremburese.savestandarddata = makeURL('/nodeexpensestandard/savestandarddata'+urlParam);
  stdremburese.delstandarddata = makeURL('/nodeexpensestandard/deletestandarddata'+urlParam);
  stdremburese.updatestandarddata = makeURL('/nodeexpensestandard/updatestandarddata'+urlParam);
  stdremburese.referransUrl = makeURL('/dutyLevel/findAll'+urlParam);
  stdremburese.referpostsUrl = makeURL('/duty/findAll'+urlParam);

//单据详情
export const bill = {};
  bill.queryDetailsData = makeURL('/billinfo/getBillInfo'+urlParam);
  bill.WFHISBYBUSINESSKEY = makeURL('/bpm/wfhisByBusinessKey'+urlParam);
  bill.approve = makeURL('/bpm/approve');

//U8 U9 NC 注册同步
export const systemIntegration = {};
  systemIntegration.getOsType = makeURL('/userCenter/getRegisterInfo'+urlParam);
  systemIntegration.saveErpRegister = makeURL('/userCenter/saveErpRegister'+urlParam);
  systemIntegration.syncDept = makeURL('/basicFile/syncDept');
  systemIntegration.syncProject = makeURL('/basicFile/syncProject'+urlParam);
  systemIntegration.syncProjectClass = makeURL('/basicFile/syncProjectClass'+urlParam);
  systemIntegration.cancelSync = makeURL('/basicFile/cancelSync'+urlParam);

//参照URL
export const refer = {};
  refer.referDataUrl = makeURL('/refbase_ctr/queryRefJSON');
  refer.referDataUserUrl = makeURL('/refbase_ctr/queryRefUserJSON');

