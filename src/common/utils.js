
export default {
  getTime: function(){
    let date = new Date();
    let m = (date.getMonth() + 1);
    let d = date.getDate()
    m = m<10 ? '0'+m : m;
    d = d<10 ? '0'+d : d;
    return date.getFullYear() + '-' + m + '-' + d
  },
  formatDate: function(ts,type){
    Date.prototype.toForm = function() {
      let m = (this.getMonth() + 1);
      let d = this.getDate()
      m = m<10 ? '0'+m : m;
      d = d<10 ? '0'+d : d;
      return this.getFullYear() + "-" + m + "-" + d;// + " " + this.getHours() + ":" + this.getMinutes();// + "分" + this.getSeconds() + "秒";
    };
    Date.prototype.toFormym = function() {
      let m = (this.getMonth() + 1);
      let d = this.getDate()
      m = m<10 ? '0'+m : m;
      d = d<10 ? '0'+d : d;
      return this.getFullYear() + "年" + m + "月";// + " " + this.getHours() + ":" + this.getMinutes();// + "分" + this.getSeconds() + "秒";
    };
    if(type=='ym'){
      return new Date(ts).toFormym()
    }
    // console.log(typeof ts);
    return new Date(ts).toForm()
  },
  updateMoney(val){
    if(!val){
      val=""
    }
    if(isNaN(Number(val.toString().replace(/,/g,'')))){
      return 0;
    }else{
      return val.toString().replace(/,/g,'')
    }
  },
  //格式化金额 result="12,345.67"
  formatCurrency:function(num) {
      if(!num){
        return "0.00";
      }
      num = num.toString().replace(/\$|\,/g,'');
      if(isNaN(num))
      num = "0.00";
      let sign = (num == (num = Math.abs(num)));
      num = Math.floor(num*100+0.50000000001);
      let cents = num%100;
      num = Math.floor(num/100).toString();
      if(cents<10)
      cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      num = num.substring(0,num.length-(4*i+3))+','+
      num.substring(num.length-(4*i+3));
      return (((sign)?'':'-') + num + '.' + cents);
  },

  // 解密格式化金额  result = "12345.67"
   unmakeFormatCurrecy:function(num ){
       if(num.indexOf(",") > 0 ){
           return parseFloat(num.replace(/[^\d\.-]/g, ""));
       }else{
           return num  ;
       }

   }

}
