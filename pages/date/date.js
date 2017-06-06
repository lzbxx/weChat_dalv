
const Util = require('../../utils/util.js');
var list = []
Page({
    data: {
        hasEmptyGrid: false,
        show:false
    },
    onLoad(options) {
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        this.calculateEmptyGrids(cur_year, cur_month);
        // this.calculateDays(cur_year, cur_month);
        this.setData({
            cur_year,
            cur_month,
            weeks_ch,
            id:"4510"
        })     
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
        var list = [];
        var that = this
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/index/details',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ id: 4510}),
            success: function (res) {

                // that.setData({
                //     data: res.data,
                //     tourSkuDate: res.data.tourSkuDate
                // })

                console.log(res)

            }
        });







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
    showfun(){
        this.setData({
            show:true
        });
        









    },
    hidefun(){
        this.setData({
            show: false
        })
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
    onShareAppMessage() {
        return {
            title: '小程序日历',
            desc: '还是新鲜的日历哟',
            path: 'pages/index/index'
        }
    }
},
    
);
