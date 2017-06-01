// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adultPrice:1699,
    childPrice:800,
    adult:1,
    child:1,
    singleRoom:0,
    price:null,
    allPirce:null,
    singlPrice:200
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // jisuan()
    this.jisuan()
  
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
    this.jisuan()
  },
  reduce:function(e){
      var role= e.currentTarget.dataset.role
      var a=this.data[role];
      if (a==1) {
        wx.showModal({
          title: '警告',
          content: '数量不能小于1',
        })

        return false;
      }
      a--
      this.setData({[role]:a})
      this.jisuan()
  },
  reduceSingle:function(e){
    var role= e.currentTarget.dataset.role
      var a=this.data[role];
      if (a==0) {
        wx.showModal({
          title: '警告',
          content: '数量不能小于0',
        })

        return false;
      }
      a--
      this.setData({[role]:a})
      this.jisuan()

  },
  jisuan:function(){
    var number = this.data.adultPrice*this.data.adult+this.data.childPrice*this.data.child+this.data.singleRoom*this.data.singlPrice
    console.log(number)
    this.setData({allPirce:number})
  },
  change:function(e){
       var role= e.currentTarget.dataset.role
        var a=e.detail.value;
         var reg = new RegExp("^[0-9]*$");
        if(reg.test(a)){
             if (e.detail.value>0) {
              this.setData({[role]:a})
              this.jisuan()
            }else{
                this.setData({[role]:this.data[role]})
                this.jisuan()
            }
        }else{
          wx.showModal({
            title: '提示！',
            content: '只能输入数字，数字大于1',
          });
           this.setData({[role]:this.data[role]})
        }
  },
   changeS:function(e){
       var role= e.currentTarget.dataset.role
        var a=e.detail.value;
         var reg = new RegExp("^[0-9]*$");
        if(reg.test(a)){
             if (e.detail.value>0) {
              this.setData({[role]:a})
              this.jisuan()
            }else{
                this.setData({[role]:this.data[role]})
                this.jisuan()
            }
        }else{
          wx.showModal({
            title: '提示！',
            content: '只能输入数字，数字大于0',
          });
           this.setData({[role]:this.data[role]})
        }
  },






})


