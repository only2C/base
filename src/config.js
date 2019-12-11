//调用java api的url

var serverUrl = process.env.SERVER;
if(window.SERVICESURL!=''){
  serverUrl = window.SERVICESURL
}
var Config = {
    serverUrl:serverUrl


};

export default Config;
