// pages/recommend/recommend.js
const api = require('../../utils/api.js');
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today_recommend:[],     //推荐歌曲
    statusBarHeight: 0,     //状态栏高度
    songsitem:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrecommend();
    this.gettophight();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  //获得每日推荐歌曲
  getrecommend() {
    wx.request({
      url: api + '/recommend/songs', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
        console.log(res.data.recommend)
        var arr = res.data.recommend;
        for (let i in arr) {
          wx.request({
            url: api + '/lyric', // 仅为示例，并非真实的接口地址
            data: {
              id: arr[i].id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res2 => {
              if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true) {
                arr[i].lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n"
              } else {
                arr[i].lyric = res2.data.lrc.lyric;
              }
            },
            fail: err => {

            }
          })
          var arr2 = [];
          for (let a in arr[i].artists) {
            arr2.push(arr[i].artists[a].name);
          }
          var artists = arr2.join("/");
          arr[i].art = artists;
          arr[i].murl = 'https://music.163.com/song/media/outer/url?id=' + arr[i].id + '.mp3';
          arr[i].coverImgUrl = arr[i].album.picUrl + '?param=200y200';
          arr[i].dt = arr[i].duration;
        }
        this.setData({
          today_recommend: arr
        })
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
  Toaudioplay(e){
  //   console.log(e.currentTarget.dataset)
  //   var src = encodeURIComponent(e.currentTarget.dataset.src);
  //   var arr = [];
  //   for (let i in e.currentTarget.dataset.artists) {
  //     arr.push(e.currentTarget.dataset.artists[i].name);
  //   }
  //   var artists = arr.join("/");
  //   console.log(artists)
  //   wx.navigateTo({
  //     url: '../audioplay/audioplay?id=' + e.currentTarget.dataset.id + '&alltime=' + e.currentTarget.dataset.alltime + '&src=' + src
  //       + '&name=' + e.currentTarget.dataset.name + '&artists=' + artists
  //   })
    app.globalData.playlist = this.data.today_recommend;
    if (e.currentTarget.dataset.playindex > (app.globalData.playlist.length - 1)){
      app.globalData.playindex = app.globalData.playlist.length - 1;
    }else{
      app.globalData.playindex = e.currentTarget.dataset.playindex;
    }
    app.globalData.mode = 'multiple';
    wx.navigateTo({
      url: '../audioplay/audioplay',
    })
  },


  showModal(e) {
    wx.request({
      url: api + '/lyric', // 仅为示例，并非真实的接口地址
      data: {
        id: e.currentTarget.dataset.songsitem.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res2 => {
        if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true) {
          e.currentTarget.dataset.songsitem.lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n"
        } else {
          e.currentTarget.dataset.songsitem.lyric = res2.data.lrc.lyric;
        }
      }
    })
    this.setData({
      modalName: e.currentTarget.dataset.target,
      songsitem: e.currentTarget.dataset.songsitem,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  false1() {
    return;
  },
  playnext() {
   
    if (app.globalData.playlist.length == 0) {
      var arr2 = [];
      arr2.push(this.data.songsitem);
      app.globalData.playlist = arr2;
      app.globalData.playindex = 0;
      app.globalData.mode = 'single';
      wx.navigateTo({
        url: '../audioplay/audioplay',
      })
    } else {
      app.globalData.playlist.splice(app.globalData.playindex + 1, 0, this.data.songsitem);
    }
  },
  //这是一个带参数的例子，info为对象
  testNotificationFromItem2Fn: function (info) {//这是也给带参数的例子，info为字符串
    var footplayer = this.selectComponent("#footplayer");
    footplayer.nextitem();
  },
  
})