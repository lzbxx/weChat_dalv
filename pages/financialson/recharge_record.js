// pages/financialson/recharge_record.js
const Util = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // arr: [{ img: "../../images/cash@2x.png", name: "现金充值", check: "../../images/check@2x.png" }]
        state: { "1": "未审核", "2": "审核通过", "3": "审核失败",  "5":"待支付","6": "已支付"}

    

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/topupList',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ uid: uid, sign_token: token, page: 1 }),
            success: function (res) {
                if (res.data.status == "00000") {
                    that.setData({
                        list:res.data.list
                    })

                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });

                    console.log(res)
                }

            }
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})