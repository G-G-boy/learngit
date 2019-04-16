const api = require('../../utils/api.js');
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    highqualitylist:[],  //精品歌单
    statusBarHeight: 0,     //状态栏高度
    sub:[], //歌单分类名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettophight();
    var highquality = JSON.parse(decodeURIComponent(options.highquality));
    this.setData({
      highqualitylist: highquality
    })
    this.getcatlist();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  Tosonglistdetails(e){
    wx.navigateTo({
      url: '../songlistdetails/songlistdetails?id=' + e.currentTarget.dataset.id,
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
  //将playCount转换成str
  playCounttostr(num) {
    var numstr;
    if (num > 10000 && num < 100000000) {
      numstr = Math.round(num / 10000) + '万';
    }
    else if (num > 100000000) {
      numstr = Math.round(num / 100000000) + '亿';
    } else {
      numstr = num.toString();
    }
    return numstr;
  },
  //获取精品歌单
  gethighqualitylist(cat){
    wx.request({
      url: api + '/top/playlist/highquality', // 仅为示例，并非真实的接口地址
      data: {
        limit: 20,
        type:cat,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.playlists)
     var  copylists =  res.data.playlists.slice(0);
        copylists.splice(0, (limit - 20));
        let playlists = copylists;
        let arr = [];
        for (let i in playlists) {
          let obj = {
            id: 0,
            name: '',
            coverImgUrl: '',
            playCount: 0,
            nickname: '',
            copywriter: '',
          }
          obj.id = playlists[i].id;
          obj.name = playlists[i].name;
          obj.coverImgUrl = playlists[i].coverImgUrl;
          obj.playCount = this.playCounttostr(playlists[i].playCount);
          obj.nickname = playlists[i].creator.nickname;
          obj.copywriter = playlists[i].copywriter;
          arr.push(obj);
        }
        var highqualitylist = this.data.highqualitylist.concat(arr);
        this.setData({
          highqualitylist: highqualitylist
        })
        limit += 20;
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  //获取歌单分类
  getcatlist(){
    wx.request({
      url: api + '/playlist/catlist', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
       // console.log(res.data.sub)
        var  arr = res.data.sub;
        var sub = [];
        for(let i in arr){
          sub.push(arr[i].name);
        }
        this.setData({
          sub:sub
        })
      }
    })
  },
  //获得全部歌单
  gettopplaylist(cat) {
    wx.request({
      url: api + '/top/playlist', // 仅为示例，并非真实的接口地址
      data: {
        limit: 20,
        type:cat,
        order:'hot',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
       // console.log(res.data.playlists)
        let playlists = res.data.playlists;
        let arr = [];
        for (let i in playlists) {
          let obj = {
            id: 0,
            name: '',
            coverImgUrl: '',
            playCount: 0,
            nickname: '',
          }
          obj.id = playlists[i].id;
          obj.name = playlists[i].name;
          obj.coverImgUrl = playlists[i].coverImgUrl;
          obj.playCount = this.playCounttostr(playlists[i].playCount);
          obj.nickname = playlists[i].creator.nickname;
          obj.copywriter = playlists[i].description || '这个人有点懒，什么都没说';
          arr.push(obj);
        }
        //console.log(arr)
        var highqualitylist = this.data.highqualitylist.concat(arr);
        this.setData({
          highqualitylist: highqualitylist
        })
      }
    })
  },
  onReachBottom() {
    var num = Math.abs(Math.floor(Math.random() * 100) - 29);
    var cat = this.data.sub[num];
    this.data.sub.splice(num,1);
    if(cat){
      this.gettopplaylist(cat);
    }else{
      return false;
    }
   
  },

  //这是一个带参数的例子，info为对象
  testNotificationFromItem2Fn: function (info) {//这是也给带参数的例子，info为字符串
    var footplayer = this.selectComponent("#footplayer");
    footplayer.nextitem();
  },


 
})