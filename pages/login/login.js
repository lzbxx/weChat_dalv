// pages/lgin/login.js
var App=getApp()
Page({
    data: {
        phone:'',
        password:''
    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },
    toregister: function () {
        wx.navigateTo({
            url: '../../pages/register/register',
        })
    },
    clear: function (e) {
        console.log(e)
        var role = e.currentTarget.dataset.role
        this.setData({ [role]: '' })
    },
    input: function (e) {
        // console.log(e)
        console.log(this.data.phone)
        this.setData({ [e.currentTarget.dataset.role]: e.detail.value })
        
    },
    login:function(){
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/login/agencyIndex',
            data: {login_name : this.data.phone ,login_pwd : this.data.password},
            method: 'POST',
            success: function(res){
             console.log(res)
            }
        })
      
        
    }

})