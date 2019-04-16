const api = require('../../utils/api.js');
const id2Url = require('../../utils/base64md5.js');
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
var topplaylist_offset = 0;//精品歌单下标头
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topplaylist:[],  //全部歌单
    highquality:[], //精品歌单
    statusBarHeight: 0,     //状态栏高度
    cover:'',
    loadModal:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettophight();
    this.gettopplaylist();
    this.gethighquality();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },

  goback() {
    wx.navigateBack({
      delta: 1
    })
  },

  //获得全部歌单
  gettopplaylist(){
    wx.request({
      url: api + '/top/playlist', // 仅为示例，并非真实的接口地址
      data: {
        limit:20,
        offset: topplaylist_offset
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
        console.log(res.data.playlists)
        let playlists = res.data.playlists;
        let arr = [];
        for(let i in playlists){
              let obj ={
                id:0,
                name:'',
                coverImgUrl:'',
                playCount:0,
                nickname: '',
              }
              obj.id = playlists[i].id;
              obj.name = playlists[i].name;
              obj.coverImgUrl = playlists[i].coverImgUrl;
              obj.playCount = this.playCounttostr(playlists[i].playCount);
              obj.nickname = playlists[i].creator.nickname;
              arr.push(obj);  
        }
      //  console.log(arr)
        topplaylist_offset += res.data.playlists.length;
        let list = this.data.topplaylist.concat(arr);
        this.setData({
          topplaylist: list
        })
      }
    })
  },
  //获取精品歌单
  gethighquality(){
    wx.request({
      url: api + '/top/playlist/highquality', // 仅为示例，并非真实的接口地址
      data: {
        limit: 20,
        offset: 0
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
        this.setData({
          highquality: arr,
          cover: id2Url.id2Url('' + (res.data.playlists[0].coverImgId_str || res.data.playlists[0].coverImgId))
        })

      }
    })
  },
  Tosonglistdetails(e){
    wx.navigateTo({
      url: '../songlistdetails/songlistdetails?id=' + e.currentTarget.dataset.id,
    })
  },
  onReachBottom() {

    this.gettopplaylist();

  },
  Tohighquality(e){
    var highquality_tostring = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.highquality));
    wx.navigateTo({
      url: '../highqualitylist/highqualitylist?highquality=' + highquality_tostring,
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
  playCounttostr(num){
    var numstr;
    if(num>10000 && num<100000000){
      numstr = Math.round(num/10000) + '万';
    }
    else if(num>100000000){
      numstr = Math.round(num / 100000000) + '亿';
    }else{
       numstr = num.toString();
    }
    return numstr;
  },
  //这是一个带参数的例子，info为对象
  testNotificationFromItem2Fn: function (info) {//这是也给带参数的例子，info为字符串
    var footplayer = this.selectComponent("#footplayer");
    footplayer.nextitem();
  },

  
})