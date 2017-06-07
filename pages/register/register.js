// pages/register/register.js
const Util = require('../../utils/util.js');
Page({

    data: {
        name: '',
        city: '',
        array: ["北京","天津", "石家庄", "唐山", "其他"],
        password: '',
        repassword: '',
        job: '',
        phone: '',
        identifyingCode: '',
        index: 0,
        time: 9,
        btn1: true,
        btn2: false,
        modal_style: false
    },
    onLoad: function (options) {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    bindPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        if (e.detail.value == 4) {
            this.setData({
                modal_style: true
            })
        }
        this.setData({
            index: e.detail.value
        })
        console.log(this.data.index)
    },
    sentMessage: function () {
        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/login/agencyVerificationCode',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({ phone: this.data.phone }),
            success: function (res) {


                console.log(res)

            }
        });
        this.setData({ btn1: false, btn2: true });
        var that = this;
        this.setData({ time: 9 });
        var time = this.data.time
        var timer = setInterval(function () {
            if (time <= 1) {
                that.setData({ btn1: true, btn2: false });
                clearInterval(timer)
            }
            time--;

            that.setData({ time: time })
        }, 1000)
    },
    clear: function (e) {
        console.log(e)
        var role = e.currentTarget.dataset.role
        this.setData({ [role]: '' })
    },
    input: function (e) {

        this.setData({ [e.currentTarget.dataset.role]: e.detail.value })

    },
    confirm: function () {
        var that = this;
        var index = this.data.index

        index++;
        switch (index) {
            case 1:
                index = 1
                break;
            case 2:
                index = 3
                break;
            case 3:
                index = 4
                break;
            case 4:
                index = 5
                break;
            case 5:
                index = 1
                break;

            default:
                break;
        }

        if (!((this.data.name).length > 0)) {
            wx.showModal({
                title: '提示',
                content: '用户名不能为空，请重新输入',
            })
            return false;
        }
        if (!(this.data.password == this.data.repassword & /[a-zA-Z0-9_]{6,16}/.test(this.data.password) & /[a-zA-Z0-9_]{6,16}/.test(this.data.repassword))) {
            wx.showModal({
                title: '提示',
                content: '请检查两次密码是否一致！长度大于6',
            });
            return false;
        }

        if (!/^1[0-9]{10}$/.test(this.data.phone)) {

            wx.showModal({
                title: '提示',
                content: '请正确输入手机号',
            })
            return false;

        }
        if (!/^[0-9]{6}$/.test(this.data.identifyingCode)) {

            wx.showModal({
                title: '验提示',
                content: '验证码格式不正确，请保证6位数字',
            })
            return false;
        }

        wx.request({
            url: 'http://dalvuapi.dalvu.com/index.php/Api/login/agencyRegister',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: Util.json2Form({
                name: that.data.name,
                province: index,
                phone: that.data.phone,
                password: that.data.password,
                vocation: that.data.job,
                vercode: that.data.identifyingCode,
            }),
            success: function (res) {
                console.log(res)
            }
        });
        console.log({
            name: that.data.name,
            province: index,
            phone: that.data.phone,
            password: that.data.password,
            vocation: that.data.job,
            vercode: that.data.identifyingCode,
        })
    },
    closeModal: function () {
        this.setData({ modal_style: false })
    },
    closeKeep: function () {
        var arr = ["北京", "唐山", "石家庄", "天津"]
        arr.push(this.data.city)
        console.log(this.data.city)
        this.setData({
            array: arr
        })
        console.log(arr)
        this.setData({ modal_style: false })
    },
    cityName: function (e) {
        this.setData({ city: e.detail.value })
    }
})