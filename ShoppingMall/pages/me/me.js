// pages/me/me.js
var app = getApp();
var aid = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderitem:[
      { 
        typeid:1,
        name:'待付款',
        imgsrc:'../../img/fukuan.png'
      },
      {
        typeid: 2,
        name: '待配送',
        imgsrc: '../../img/peisong.png'
      },
      {
        typeid: 4,
        name: '待提货',
        imgsrc: '../../img/tihuo.png'
      },
      {
        typeid: 5,
        name: '已提货',
        imgsrc: '../../img/yitihuo.png'
      },
    ]

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo, hasUserInfo: true
        })
      }
    } else {      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo, hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toorders(e){
    var tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../orders/orders?tid='+tid
    })
  },
  toorderitem(e){

    var tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../orders/orders?tid='+tid
    })
  },
  chooseAddress(){
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
         var arr = wx.getStorageSync('address') || [];
         if(arr.length > 0){
           arr.splice(0,1,res);
         }else{
           arr.splice(0, 1, res);
         }
         try{
           wx.setStorageSync('address', arr);
           wx.showToast({
             title: '选择成功',
             icon: 'success',
             duration: 2000
           });
           return;
         }catch(e){
          console.log(e)
         }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  goapply(){
    wx.navigateTo({
      url: '../apply/apply'
    })
  },
  //清楚所有缓存
  clear() {
    wx.clearStorageSync();
  }



})