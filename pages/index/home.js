// pages/index/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  role:"游客",
  username:"公积金",
  List:null


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: 'http://dalvuapi.dalvu.com/index.php/Api/index/indexMod',
      method:"POST",
      success: function (res) {
      
        var columnList = res.data.columnList
        that.setData({
          columnList
        })
      }
    });
    wx.request({
      url: 'http://dalvuapi.dalvu.com/index.php/Api/index/indexLineList',
      method: "POST",
      success: function (res) {
        console.log(res.data.list)
         var List = res.data.list;
        
         
        that.setData({
          List:List
        });

        wx.hideLoading()



      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  skip:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/line_details/line_details?id='+e.currentTarget.dataset.id
    });
 
    

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
  toLogin:function(){
      wx.navigateTo({
          url: '../../pages/login/login'
      })

  },

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