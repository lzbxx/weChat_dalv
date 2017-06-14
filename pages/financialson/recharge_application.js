var app = getApp()
const Util = require("../../utils/util.js")
Page({
    data: {
        arr: [{ img: "../../images/cash@2x.png", name: "现金充值" },
        { img: "../../images/present_application@2x.png", name: "刷卡充值" },
        { img: "../../images/cheque.png", name: "支票充值" },
        { img: "../../images/bank@2x.png", name: "银行转账" }
        ],
        index: true,
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        index5: false,
        bankList: null,
        money_number: '',
        payer: "",



        /** 
         * 页面配置 
         */

        // tab切换  
        currentTab: 0,
    },
    onLoad: function () {
       
        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyTopup',
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

                    var a = res.data.operatorInfo.topupInfo
                    a = a.split("<br />")
                    for (var i = 0; i < a.length; i++) {
                        if (a[i] == "" || typeof (a[i]) == "undefined") {
                            a.splice(i, 1);
                            i = i - 1;
                        }
                    }

                    var result = [];
                    for (var i = 0, len = a.length; i < len; i += 3) {

                        result.push(a.slice(i, i + 3));

                    }
                    console.log(result);
                    that.setData({
                        bankList: result
                    });
                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });
                }
                // console.log(res.data.operatorInfo
                //     .topupInfo)
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

    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    select: function (e) {
        this.setData({
            index: false,
            index1: false,
            index2: false,
            index3: false,
            index4: false,
            index5: false,
        })
        var index = e.currentTarget.dataset.index
        this.setData({
            [index]: true
        })

    },
    under_line: function () {


        var type;
        var payer = this.data.payer;
        var amount = this.data.money_number;
        if (this.data.index) {
            type = "1"

        } else if (this.data.index1) {
            type = "2"
        } else if (this.data.index2) {
            type = "3";
            if (payer == "" | payer == "undefined") {
                wx.showToast({
                    image: "../../images/close.png",
                    title: '请输入汇款方',
                })
                return false;
            }

        } else if (this.data.index3) {
            type = "4";
            if (payer == "" | payer == "undefined") {
                wx.showToast({
                    image: "../../images/close.png",
                    title: '请输入汇款方'
                   
                })
                return false;
            }

        } else if (this.data.index4) {
            type = "6"
        } else if (this.data.index5) {
            type = "7"
        }

        if (this.data.money_number <= 0) {
            wx.showModal({
                title: '提示',
                content: '请输入金额',
            })
            return false
        }


        var that = this;
        var uid = wx.getStorageSync('Uid');
        var token = wx.getStorageSync('sign_token');
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/agencyFinance/applyTopupHandle',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({
                uid: uid,
                sign_token: token,
                topup_type: type,
                payer: payer,
                amount: amount
            }),
            success: function (res) {
                if (res.data.status == "00000") {
                    wx.showToast({
                        title: "充值成功"
                    })
                    that.setData({
                        payer:'',
                        money_number:''


                    })
                    wx.setStorage({
                        key: 'sign_token',
                        data: res.data.sign_token,
                    });

                }
                console.log(res)
                if (res.data.status=="00002"){
                    wx.navigateTo({
                        url: '../../pages/login/login',
                    })
                };
               
            }
        });

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
    payer: function (e) {
        this.setData({
            payer: e.detail.value
        })
     
    },
    onShow:function(){
        this.onLoad()
    }
})