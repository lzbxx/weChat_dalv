var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const Util = require('../../utils/util.js');
Page({
    data: {
        winWidth: 0,
        winHeight: 0,
        // tab切换  
        currentTab: 0,
        data: null

    },
    change_money: function () {
        wx.navigateTo({
            url: '../../pages/change_price/change_price'
        })

    },
    book: function () {
        var that = this;
        wx.navigateTo({
            url: '../../pages/submit/submit'
        })
    },
    to_atlas: function () {
        wx.navigateTo({
            url: '../../pages/line_atlas/line_atlas'
        })
    },
    onLoad: function (options) {



        var that = this;
        wx.showLoading({
            title: '加载中...',
        })

        console.log("传输的参数是：" + options.id);


        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/index/details',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ id: options.id }),
            success: function (res) {
                // console.log(res);
                that.setData({
                    data: res.data
                })


            }
        });

        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/index/detailsScheduling',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ id: options.id }),
            success: function (res) {
                var tour_description = res.data.tour_description
                Util.dinner(tour_description)
                that.setData({
                    tour_description
                })
                wx.hideLoading()
            }
        });
        // var article = null;




        // wx.request({
        //     url: 'http://dalvuapi.dalvu.com/index.php/Api/index/detailsEdge',
        //     method: "POST",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     data: Util.json2Form({ id: options.id }),
        //     success: function (res) {
        //         article = res.data.list.description;
        //         WxParse.wxParse('article', 'html', article, that, 5);
        //     }
        // });


        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/index/detailsCostExplain',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ id: options.id }),
            success: function (res) {
                var costStatement = res.data.list.fee_include;
                costStatement = costStatement.replace(/(\n)/g, "");
                costStatement = costStatement.replace(/(\t)/g, "");
                costStatement = costStatement.replace(/(\r)/g, "");
                costStatement = costStatement.replace(/<\/?[^>]*>/g, "");
                costStatement = costStatement.replace(/\s*/g, "");
                costStatement = costStatement.replace(/&nbsp;/g, "");

                var fee_exclude = res.data.list.fee_exclude;
                fee_exclude = fee_exclude.replace(/(\n)/g, "");
                fee_exclude = fee_exclude.replace(/(\t)/g, "");
                fee_exclude = fee_exclude.replace(/(\r)/g, "");
                fee_exclude = fee_exclude.replace(/<\/?[^>]*>/g, "");
                fee_exclude = fee_exclude.replace(/\s*/g, "");
                fee_exclude = fee_exclude.replace(/&nbsp;/g, "");
                that.setData({
                    costStatement,
                    fee_exclude

                });
               
            }
            });
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/index/detailsNotice',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ id: options.id }),
            success: function (res) {
                var notice = res.data.list.notice;
                notice = notice.replace(/(\n)/g, "");
                notice = notice.replace(/(\t)/g, "");
                notice = notice.replace(/(\r)/g, "");
                notice = notice.replace(/<\/?[^>]*>/g, "");
                notice = notice.replace(/\s*/g, "");
                notice = notice.replace(/&nbsp;/g, "");
                that.setData({
                    notice
                });
                console.log(res)
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