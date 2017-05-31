// pages/financial/financial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      financial_fun: [{ img: "../../images/transaction_record@2x.png", name: "交易记录", url:"transaction_record"},
          { img: "../../images/recharge_application@2x.png", name: "充值申请", url:"recharge_application"},
          { img: "../../images/recharge_record@2x.png", name: "充值记录", url:"transaction_record"},
          { img: "../../images/present_application@2x.png", name: "提现申请", url:"present_application"},
          { img: "../../images/cash_register@2x.png", name: "提现记录", url:"cash_register"},
          { img: "../../images/invoice_application@2x.png", name: "发票申请", url:"invoice_application"},
          { img: "../../images/invoice_record@2x.png", name: "发票记录", url:"invoice_record"},
          { img: "../../images/contract_application@2x.png", name: "合同申请", url:"contract_application"},
          { img: "../../images/contract_record@2x.png", name: "合同记录", url:"contract_record"}
    
    ]
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
  toDetail:function(e){
      var a =e.currentTarget.dataset.name;
      wx.navigateTo({
          url: '../../pages/financialson/'+a,
      })
      
  }
})