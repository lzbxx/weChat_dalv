// pages/index/home.js
const util = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        role: "游客",
        username: "公积金",
        List: null,
        login: true,
        user: false,
        adviser: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.showLoading({
        //     title: '加载中',
        // })
        var that = this;
        var uid = wx.getStorageSync('Ui');
        var token = wx.getStorageSync('sign_token');
        var user_type = wx.getStorageSync('user_type');

        wx.getStorage({
            key: 'user_type',
            success: function(res){
                if (res.data=="4"){
                    that.setData({
                        login:false,
                        user: true,
                        role:"顾问"
                    })

                } else if (res.data == "5"){
                    that.setData({
                        login: false,
                        user: true,
                        adviser:true
                    })
                }else{
                    wx.navigateBack({
                        
                    })
                }
            },
            fail: function() {
                console.log(111)
            }
        })



    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    skip: function (e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../../pages/line_details/line_details?id=' + e.currentTarget.dataset.id
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // var that = this;
        // var uid = wx.getStorageSync('Ui');
        // var token = wx.getStorageSync('sign_token');
        // var user_type = wx.getStorageSync('user_type');

        // if (uid == "" | token == "" | user_type == "") {
        //     wx.navigateTo({
        //         url: "../../pages/date/date"
        //     })
        //     // wx.showLoading({
        //     //     title: 'kkk',
        //     // })
        // }
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
    toLogin: function () {
        wx.navigateTo({
            url: '../../pages/login/login'
        })

    },
    toSon: function (e) {
        console.log(e.currentTarget.dataset.url)
    }

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {
    //   return {
    //     title: '大旅游',
    //     desc: '',
    //     path: '/pages/line_details/line_details'
    //   }
    // },

})