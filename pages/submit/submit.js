// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adult:1,
    child:1,
    singleRoom:0
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
  add:function(e){
      var role= e.currentTarget.dataset.role
      var a=this.data[role];
      a++
    this.setData({[role]:a})
  },
  reduce:function(e){
      var role= e.currentTarget.dataset.role
      var a=this.data[role];
      if (a==1) {
        wx.showToast({
          title: '数量不能为0',
          icon: 'fail'
        })

        return false;
      }
      a--
      this.setData({[role]:a})
  },
  reduceSingle:function(e){
    var role= e.currentTarget.dataset.role
      var a=this.data[role];
      if (a==0) {
        wx.showToast({
          title: '数量不能小于0'
        })

        return false;
      }
      a--
      this.setData({[role]:a})

  }



})