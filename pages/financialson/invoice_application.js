// pages/financialson/invoice_application.js
const Util = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        index: 0,
        money: 0,
        dte: {
            "lastTotal": '',
            "operatorInfo": {
                "express_fee": "",
                "address": "",
                "tel": ""
            },
            "sign_token": ""
        },
        invoiceTypeList: [],
        title: '',
        detail_comm: '',
        express_fee: '',
        addr: '',
        name: '',
        phone: '',
        remark: '',


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyInvoice',
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
                        dte: res.data
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
                var invoiceTypeList = []
                for (let i = 0; i < res.data.invoiceTypeList.length; i++) {
                    invoiceTypeList.push(res.data.invoiceTypeList[i].detail)

                }
                that.setData({
                    invoiceTypeList: invoiceTypeList
                })
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

    },
    select: function (e) {
        var way = e.currentTarget.dataset.way;
        if (way == "fast") {
            this.setData({
                index1: 1,
                index2: 0,
                index3: 0,
                index4: 1,
            })

        } else if (way == "invite") {
            console.log("invite")
            this.setData({
                index1: 0,
                index2: 1,
                index3: 0,
                index4: 0,
            })
        } else if (way == "freightAtDestination") {
            console.log("freightAtDestination");
            this.setData({
                index1: 1,
                index2: 0,
                index3: 1,
                index4: 0,
            })
        } else if (way == "sendByPost") {
            console.log("sendByPost")
            this.setData({
                index1: 1,
                index2: 0,
                index3: 0,
                index4: 1,
            })

        }

    },
    submit: function () {
        if (this.data.index1 == 1) {
            var that = this;
            var uid = wx.getStorageSync('Uid');
            var token = wx.getStorageSync('sign_token');
            wx.request({
                url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyInvoice',
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: Util.json2Form({
                    uid: uid,
                    sign_token: token,
                    // {
                    //     title：公司名称（安广利有限公司）
                    //     amount：发票金额（100）
                    //     detail_comm：发票备注（代订机票）
                    //     detail：发票类型（下拉选择，旅游费）
                    //     request_method：获取类型（2快递）
                    //     express_fee：快递选择（3到付，4邮寄）
                    //     addr：收获地址（北京市朝阳区）
                    //     name：联系人（杨小毛）
                    //     phone：手机号（13126997216）
                    //     remark：备注信息（用申通）
                    //     code：验证code（400）
                    // }

                }),
                success: function (res) {
                    if (res.data.status == "00000") {
                        that.setData({
                            dte: res.data
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
        } else if (this.data.index2 == 1) {

        }



    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    }
})

// {
//     uid ：用户id
//     sign_token：签名token
//     title：公司名称（安广利有限公司）
//     amount：发票金额（100）
//     detail_comm：发票备注（代订机票）
//     detail：发票类型（下拉选择，旅游费）
//     request_method：获取类型（2快递）
//     express_fee：快递选择（3到付，4邮寄）
//     addr：收获地址（北京市朝阳区）
//     name：联系人（杨小毛）
//     phone：手机号（13126997216）
//     remark：备注信息（用申通）
//     code：验证code（400）
// }
