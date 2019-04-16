const api = require('../../utils/api.js')
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
var Official = [];
var Recommend= [];
var Global = [];
var more = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Official:[],   //官方榜
    Recommend:[],  //推荐榜
    Global:[],       //全球榜
    more:[],         //更多
    statusBarHeight: 0,     //状态栏高度
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getlist();
    this.gettophight();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },

  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  Tosonglistdetails(e) {
    wx.navigateTo({
      url: '../songlistdetails/songlistdetails?id=' + e.currentTarget.dataset.id,
    })
  },
  //获得榜单详情
  getlist(){
    wx.request({
      url: api + '/toplist/detail', // 仅为示例，并非真实的接口地址
    
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
        console.log(res.data.list)
        for(let i = 0;i<4;i++){
            Official.push(res.data.list[i]);
        }
        for(let i = 4;i<10;i++){
          Recommend.push(res.data.list[i]);
        }
        for(let i = 10;i<16;i++){
          Global.push(res.data.list[i]);
        }
        for (let i = 16; i < res.data.list.length;i++){
          more.push(res.data.list[i]);
        }
        if(true){
          this.setData({
            Official: Official,
            Recommend: Recommend,
            Global: Global,
            more:more
          })
        }
       
      }
    })
  },
  //获取状态栏高度
  gettophight() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          statusBarHeight: res.statusBarHeight * 2
        })
      }
    })
  },
  //这是一个带参数的例子，info为对象
  testNotificationFromItem2Fn: function (info) {//这是也给带参数的例子，info为字符串
    var footplayer = this.selectComponent("#footplayer");
    footplayer.nextitem();
  },
})
  
