// let {WeToast} = require('src/wetoast.js')    // 返回构造函数，变量名可自定义
App({
    // WeToast    // 后面可以通过app.WeToast访问
   json2Form : function (json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
    } ,
    
   getStorage:function(key){
       wx.getStorageSync({
           key: key,
           success: function (res) {
               key = res.data
           },
       })
       return wx.getStorage
   }
    
    
})