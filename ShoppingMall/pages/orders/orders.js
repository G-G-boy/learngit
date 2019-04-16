//获取应用实例
var app = getApp()
Page({
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    cancelorder:[],   // 待支付订单
    paidorder:[],    //已支付订单
    allorder:[]       //全部订单
  },
  onShow(){
    this.getcancelorder();
    this.getpaidorder();
    this.getallorder();
  },
  onLoad: function (option) {
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
    var tid = option.tid;
    that.setData({
      currentTab:tid
    })
 
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
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
//获取缓存中cancelorder的数据
  getcancelorder(){
    var cancelorder = wx.getStorageSync('cancelorder') || [];
    this.setData({
      cancelorder: cancelorder
    })

  },
  getpaidorder() {
    var paidorder = wx.getStorageSync('paidorder') || [];
    this.setData({
      paidorder: paidorder
    })

  },
  getallorder(){
    var allorder = wx.getStorageSync('allorder') || [];
    this.setData({
      allorder: allorder
    })
  },
  toordersubmit(e){
    
    var item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../order-submit/order-submit?item=' + item,
    })
  }






})
