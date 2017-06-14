function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function json2Form(json) {
    var str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}
function dinner(tour_description) {
    var arr = { "1": "早", "2": "中", "3": "晚" }
    for (var i = 0; i < tour_description.length; i++) {
        var din = [];
        for (var j = 0; j < tour_description[i].dining.split(",").length; j++) {
            din.push(arr[tour_description[i].dining.split(",")[j]]);
            din.join(",")
            tour_description[i].din = din
        }
    }
    return tour_description
}
function parseHtml(brightened_dot){
    brightened_dot = brightened_dot.replace(/(\n)/g, "");
    brightened_dot = brightened_dot.replace(/(\t)/g, "");
    brightened_dot = brightened_dot.replace(/(\r)/g, "");
    brightened_dot = brightened_dot.replace(/<\/?[^>]*>/g, "");
    brightened_dot = brightened_dot.replace(/\s*/g, "");
    brightened_dot = brightened_dot.replace(/&nbsp;/g, ""); 
    return brightened_dot;
}
function getStorage(key){
    var a;
    wx.getStorage({
        key: key,
        success: function(res) {
            a =res.data;
            
        },
        complete:function(){
            return a
        }
    })
    
}
// function list(){
   
//     var uid = wx.getStorageSync('Uid');
//     var token = wx.getStorageSync('sign_token');
//     var list =   wx.request({
//         url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/accountTransaction',
//         method: "POST",
//         header: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         data: json2Form({ uid: uid, sign_token: token, page: 1 }),
//         success: function (res) {
            
//             if (res.data.status == "00000") {
//               list = res.data.list
//                 wx.setStorage({
//                     key: 'sign_token',
//                     data: res.data.sign_token,
//                 }); 
//                 return res.data.list

//             }
           
            
//         },
        
        
        
//     });
//     console.log(list)

   
// }

module.exports = {
    json2Form: json2Form,
    formatTime: formatTime,
    dinner:dinner,
    parseHtml: parseHtml,
    getStorage: getStorage,
 
}
