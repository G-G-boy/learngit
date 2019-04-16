// pages/coupon/coupon.js
Page({

  data: {
    height: 0,
    ceshi:[1,2]
  },
  //设置轮播容器的高度
  setContainerHeight: function (e) {

    //图片的原始宽度
    var imgWidth = e.detail.width;

    //图片的原始高度
    var imgHeight = e.detail.height;

    //同步获取设备宽度
    var sysInfo = wx.getSystemInfoSync();

    //获取屏幕的宽度
    var screenWidth = sysInfo.screenWidth;

    //获取屏幕和原图的比例
    var scale = screenWidth / imgWidth;

    //设置容器的高度
    this.setData({
      height: imgHeight * scale
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '这是一张卡券'
    })
  },
  Toshopdetails(){
    wx.navigateTo({
      url: '../shopdetails/shopdetails',
    })
  }

})