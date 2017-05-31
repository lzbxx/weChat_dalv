// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        array: ["北京", "唐山", "石家庄", "天津"],
        password: '',
        repassword: '',
        job: '',
        phone: '',
        identifyingCode: '',
        index: 0,
        time: 9,
        btn1: true,
        btn2: false,
         modal_style:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    check: function (e) {

    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    sentMessage: function () {
        this.setData({ btn1: false, btn2: true });
        var that = this;
        this.setData({ time: 59 });
        var time = this.data.time

        var timer = setInterval(function () {
            if (time <= 1) {
                that.setData({ btn1: true, btn2: false });
                clearInterval(timer)
            }
            time--;
            console.log(time)
            that.setData({ time: time })
        }, 1000)
    },
    clear:function(e){
        console.log(e)
        var role = e.currentTarget.dataset.role
        this.setData({ [role]:''})
    },
    input:function(e){
     
        this.setData({ [e.currentTarget.dataset.role]: e.detail.value})

    },
    confirm:function(){
        if (!((this.data.name).length>0)){
            wx.showModal({
                title: '提示',
                content: '用户名不能为空，请重新输入',
            })
         return false;
        }
        if (!(this.data.password == this.data.repassword & /[a-zA-Z0-9_]{6,16}/.test(this.data.password) & /[a-zA-Z0-9_]{6,16}/.test(this.data.repassword))){
            wx.showModal({
                title: '提示',
                content: '请检查两次密码是否一致！长度大于6',
            })
        }
      
        if (!/^1[0-9]{10}$/.test(this.data.phone)){

            wx.showModal({
                title: '提示',
                content: '请检查两次密码是否一致！长度大于6',
            })

        }
 
    }

})