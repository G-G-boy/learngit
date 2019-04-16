// pages/douban/douban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      list1:[],
      list2:[],
      list3:[],
      list_title:'',
      list_title1:'',
      list_title2: '',
      list_title3: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '别急嘛' })
    this.requestData();
    this.requestData1();
    this.requestData2();
    this.requestData3();
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  requestData(){
    var that = this;
    var api = 'https://douban.uieee.com/v2/movie/in_theaters';
    wx.request({
      url: api,
      data: {

      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list:res.data.subjects,
          list_title:res.data.title
        })
      }
    })
  },
  requestData1() {
    var that = this;
    var api = 'https://douban.uieee.com/v2/movie/coming_soon';
    wx.request({
      url: api,
      data: {

      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list1: res.data.subjects,
          list_title1: res.data.title
        })
      }
    })
  },
  requestData2() {
    var that = this;
    var api = 'https://douban.uieee.com/v2/movie/new_movies';
    wx.request({
      url: api,
      data: {

      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list2: res.data.subjects,
          list_title2: res.data.title
        })
      }
    })
  },
  requestData3() {
    var that = this;
    var api = 'https://douban.uieee.com/v2/movie/top250';
    wx.request({
      url: api,
      data: {

      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list3: res.data.subjects,
          list_title3: res.data.title
        })
      }
    })
  },
  gologs(event){
   console.log(event)
   var aid = event.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '../logs/logs?aid=' + aid
    })
  }


})