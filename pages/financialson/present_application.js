// pages/financialson/present_application.js
const Util = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        agencyInfo: {
            "id": "",
            "name": "",
            "operator_id": "",
            "mobile": "",
            "share_home_title": "",
            "account_balance": "",
            "bank_account": "",
            "bank_name": "",
            "account_state": "",
            "availableBalance": ''
        },
        money_number: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //   var str = "abcdefg";
        //   alert(str.substr(str.length - 4));
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyWithdraw',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({
                uid: uid,
                sign_token: token,
            }),
            success: function (res) {
                if (res.data.status == "00000") {
                    that.setData({
                        agencyInfo: res.data.agencyInfo
                    })
                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });
                } else {
                    wx.showToast({
                        image: "../../images/close.png",
                        title: '数据请求失败，即将前往登录',
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '../../pages/login/login',
                        })
                    }, 1000)
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
        this.onLoad()

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

    },
    money_number: function (e) {

        if (!/^[0-9]/.test(e.detail.value)) {
            wx.showModal({
                title: '提示',
                content: '金额只能输入数字',
            });
            this.setData({
                money_number: ""
            })
        } else {
            this.setData({
                money_number: e.detail.value
            })
        }
    },
    submit: function () {
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        var amount = this.data.money_number;
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyWithdrawHandle',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({
                uid: uid,
                sign_token: token,
                amount: amount,
                code: 400
            }),
            success: function (res) {
                if (res.data.status == "00000") {
                    wx.showToast({
                        title: "充值成功"
                    })
                    that.setData({
                        payer: '',
                        money_number: ''
                    })
                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });

                } else {
                    wx.showToast({
                        image: '../../images/close.png',
                        title: res.data.msg,
                    })
                }

                if (res.data.status == "00002") {
                    wx.navigateTo({
                        url: '../../pages/login/login',
                    })
                };

            }
        });

    }
})