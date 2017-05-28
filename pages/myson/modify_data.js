Page({
  data: {
    array: ['男', '女'],
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad:function(){

  },
    bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  router:function(){
      wx.navigateTo({
          url: '../../pages/myson/change_pwd',
      })
  }
})