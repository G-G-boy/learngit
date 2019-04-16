var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData(options.id);
  },
  requestData(id){
    var that = this;
    var api = 'https://news-at.zhihu.com/api/4/news/'+id;

    wx.request({
      url: api, // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.js)
        console.log(res.data.css)

      
   

        var article = res.data.body;


        WxParse.wxParse('article', 'html', article, that, 5);

       that.setData({
         list:res.data
       })
      }
    })

  }











})