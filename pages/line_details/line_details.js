var app = getApp();
var Util = require('../../utils/util.js');
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    data:null
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
      title: '加载中',
    })
    
    console.log("传输的参数是：" + options.id);


    wx.request({
      url: 'http://dalvuapi.dalvu.com/index.php/Api/index/details',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: Util.json2Form({ id:options.id }),
      success: function (res) {
        console.log(res);
        that.setData({
          data:res.data
        })

        wx.hideLoading()
      }
    });







 

    /** 
     * 获取系统信息 
     */
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