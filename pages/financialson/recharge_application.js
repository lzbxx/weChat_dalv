var app = getApp()
Page({
  data: {
    arr:[{img:"../../images/cash@2x.png",name:"现金充值"},
        { img:"../../images/present_application@2x.png",name:"刷卡充值"},
        { img:"../../images/cheque.png",name:"支票充值"},
        { img:"../../images/bank@2x.png",name:"银行转账"}],
        index:true,
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        index5: false,
    


    /** 
        * 页面配置 
        */
   
    // tab切换  
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;

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
    that.setData({ currentTab: e.detail.current});

  },
  
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  select:function(e){
      this.setData({
          index: false,
          index1: false,
          index2: false,
          index3: false,
          index4: false,
          index5: false,})
      var index = e.currentTarget.dataset.index
      this.setData({
          [index]:true
      })

   }

}) 