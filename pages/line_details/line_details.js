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
    getThisMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    },
    getFirstDayOfWeek(year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculateEmptyGrids(year, month) {
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        let empytGrids = [];
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                empytGrids.push(i);
            }
            this.setData({
                hasEmptyGrid: true,
                empytGrids
            });
        } else {
            this.setData({
                hasEmptyGrid: false,
                empytGrids: []
            });
        }
    },
    calculateDays(year, month) {
        let days = [];
        var list = [
            {
                "id": "100934",
                "price_adult_list": "2190.00",
                "start_time": "2017-08-05",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100933",
                "price_adult_list": "2190.00",
                "start_time": "2017-08-04",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100932",
                "price_adult_list": "2190.00",
                "start_time": "2017-08-03",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100931",
                "price_adult_list": "2190.00",
                "start_time": "2017-08-02",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100930",
                "price_adult_list": "2190.00",
                "start_time": "2017-08-01",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100929",
                "price_adult_list": "2190.00",
                "start_time": "2017-07-29",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100928",
                "price_adult_list": "2190.00",
                "start_time": "2017-07-28",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100919",
                "price_adult_list": "2190.00",
                "start_time": "2017-07-27",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100927",
                "price_adult_list": "2190.00",
                "start_time": "2017-07-26",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100926",
                "price_adult_list": "2190.00",
                "start_time": "2017-07-25",
                "price_adult_agency": "1850.00"
            },
            {
                "id": "100920",
                "price_adult_list": "2190.00",
                "start_time": "2017-06-22",
                "price_adult_agency": "1890.00"
            },
            {
                "id": "100921",
                "price_adult_list": "2190.00",
                "start_time": "2017-06-21",
                "price_adult_agency": "1590.00"
            },
            {
                "id": "100924",
                "price_adult_list": "2190.00",
                "start_time": "2017-06-20",
                "price_adult_agency": "1890.00"
            }
        ]

        month = month > 9 ? month : "0" + month;
        var yue = year + "-" + month
        var arr = new Array()

        for (var j = 0; j < list.length; j++) {
            var a = list[j].start_time.slice(0, 7)

            if (yue == a) {
                arr.push(list[j])
            }
        }
        const thisMonthDays = this.getThisMonthDays(year, month);

        for (let i = 1; i <= thisMonthDays; i++) {
            days.push({ day: i });
        }
        for (var k = 0; k < arr.length; k++) {
            var number = parseInt(arr[k].start_time.slice(8, 10)) - 1;
            var price_adult_list = arr[k].price_adult_list.substring(0, arr[k].price_adult_list.length - 3)
            var price_adult_agency = arr[k].price_adult_agency.substring(0, arr[k].price_adult_agency.length - 3)

            days[number] = { price_adult_list: price_adult_list, price_adult_agency: price_adult_agency }

        }

        this.setData({
            days
        });
        console.log(days)
    },
    handleCalendar(e) {
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })

        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        }
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
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month);
        this.setData({
            cur_year,
            cur_month,
            weeks_ch
        })


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