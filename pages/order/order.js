var app = getApp()
const Util = require("../../utils/util.js")
Page({
    data: {
        /** 
            * 页面配置 
            */
        winWidth: 0,
        winHeight: 0,
        // tab切换  
        currentTab: 0,
        status: { "1": "未提交",
         "2": "已提交", 
         "3": "已确认付款", 
         "4": "已取消",
         "5": "已关闭",
         "6": "已付预付款",
         "7": "已付全款",
         "8": "已退款", 
         "9": "取消中",
         "10": "取消中,待退款(供应商确认)", 
         "11": "拒绝取消订单",
         "12": "取消中,待退款(代理商管理确认)",
         "13": "已取消,已退款" }
    },
    onLoad: function () {
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        var user_type = wx.getStorageSync('user_type');


        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/api/AgencyOrder/lineOrder',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ uid: uid, sign_token: token, page: 1 }),
            success: function (res) {
                if (res.data.status == "00000") {

                    that.setData({
                        list: res.data.list
                    })
                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });
                }
            }
        });





        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    /** 
       * 滑动切换tab 
       */
    bindChange: function (e) {
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
    /** 
     * 点击tab切换 
     */
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})  