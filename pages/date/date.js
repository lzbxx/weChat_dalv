const conf = {
    data: {
        hasEmptyGrid: false
    },
    onLoad(options) {
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
    onShareAppMessage() {
        return {
            title: '小程序日历',
            desc: '还是新鲜的日历哟',
            path: 'pages/index/index'
        }
    }
};

Page(conf);
