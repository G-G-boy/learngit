// pages/order-submit/order-submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_submit:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = JSON.parse(options.item);
    console.log(item)
   this.setData({
     order_submit : item
   })
  },


})