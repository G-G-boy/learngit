// pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.requestData(options.aid);
  },
  requestData(aid){
    var that =this;
    var api = 'https://douban.uieee.com/v2/movie/' + aid;
    wx.request({
      url: api,
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
       
        that.setData({
          list: res.data.subjects
        })
      }
    })
  }

 
})