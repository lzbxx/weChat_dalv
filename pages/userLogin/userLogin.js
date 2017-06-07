// pages/userLogin/userLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone: '',
      identifyingCode: '',
      btn1: true,
      btn2: false,
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
  sentMessage: function () {
      // wx.request({
      //     url: 'http://dalvuapi.dalvu.com/index.php/Api/login/agencyVerificationCode',
      //     method: "POST",
      //     header: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     data: Util.json2Form({ phone: this.data.phone }),
      //     success: function (res) {


      //         console.log(res)

      //     }
      // });
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

          that.setData({ time: time })
      }, 1000)
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
  }
})