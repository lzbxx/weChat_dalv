// pages/lgin/login.js
var App = getApp();
const Util = require('../../utils/util.js');
Page({
    data: {
        phone: '',
        password: ''
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
            url: '../../pages/selectidentity/selectidentity',
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
    login: function () {
        var that=this
     wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/login/agencyIndex',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            // data: Util.json2Form({ login_name: that.data.phone, login_pwd: that.data.password }),
            data: Util.json2Form({ login_name:"13126997216", login_pwd:"123456"}),
            success: function (res) {
                console.log(res);
                if (res.data.status=="00000"){
                    wx.showToast({
                        title: '登录成功',
                        image:"../../images/close.png"
                    });

                    wx.setStorage({
                        key:'sign_token',
                        data: res.data.sign_token,
                    });
                    wx.setStorage({
                        key: 'Uid',
                        data: res.data.uid,
                    });
                    wx.setStorage({
                        key: 'user_type',
                        data: res.data.user_type,
                    });
                 
                    wx.navigateBack({
                        url:"../../pages/index/home"
                    });

                    
                } else if (res.data.status == "00001"){
                    wx.showToast({
                        title: '登录失败',
                        image: "../../images/close.png"
                    });
                }



            }
        });


    }

})