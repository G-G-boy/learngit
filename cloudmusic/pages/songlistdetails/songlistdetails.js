const api = require('../../utils/api.js');
const id2Url = require('../../utils/base64md5.js');
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:[],
    songs:[],
    statusBarHeight: 0,     //状态栏高度
    cover:'',
    songsitem:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettophight();
    this.getsongdetail(options.id);
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },

  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  //获取用户详情
  getuserdetail(id){
    wx.request({
      url: api + '/user/detail?uid=' + id, // 仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.profile)
        this.setData({
          user_detail: res.data.profile
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
  //获取歌曲详情
  getsongdetail(id) {
    var that = this
    wx.request({
      url: api + '/playlist/detail',
      data: {
        id:id,
        limit:1000
      },
      success: function (res) {
        var canplay = [];
        for (let i = 0; i < res.data.playlist.tracks.length; i++) {

          wx.request({
            url: api + '/lyric', // 仅为示例，并非真实的接口地址
            data: {
              id: res.data.playlist.tracks[i].id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res2 => {
              //判断是否有歌词
              if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true) {
                res.data.playlist.tracks[i].lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n"
              }else{
                res.data.playlist.tracks[i].lyric = res2.data.lrc.lyric;
              } 
            },
            fail:err => {
        
            }
          })
          var arr = [];
          for (let a in res.data.playlist.tracks[i].ar) {
            arr.push(res.data.playlist.tracks[i].ar[a].name);
          }
          var artists = arr.join("/");
          res.data.playlist.tracks[i].art = artists;
          res.data.playlist.tracks[i].murl = 'https://music.163.com/song/media/outer/url?id=' + res.data.playlist.tracks[i].id +'.mp3';
          res.data.playlist.tracks[i].coverImgUrl = res.data.playlist.tracks[i].al.picUrl + '?param=200y200';
            canplay.push(res.data.playlist.tracks[i])
        }
        console.log(canplay)
        that.setData({
          playlist: res.data.playlist,
          songs: canplay,
          cover: id2Url.id2Url('' + (res.data.playlist.coverImgId_str || res.data.playlist.coverImgId))
        });
    
      }
    });
  },
  Toaudioplay(e) {
   // console.log(e.currentTarget.dataset)
    var src = encodeURIComponent(e.currentTarget.dataset.src);
    app.globalData.playlist = this.data.songs;
    if (e.currentTarget.dataset.playindex > (app.globalData.playlist.length - 1)) {
      app.globalData.playindex = app.globalData.playlist.length - 1;
    } else {
      app.globalData.playindex = e.currentTarget.dataset.playindex;
    }
    app.globalData.mode = 'multiple';
    // wx.navigateTo({
    //   url: '../audioplay/audioplay?id=' + e.currentTarget.dataset.id + '&alltime=' + e.currentTarget.dataset.alltime + '&src=' + src
    //     + '&name=' + e.currentTarget.dataset.name + '&artists=' + artists
    // })
    wx.navigateTo({
      url: '../audioplay/audioplay',
    })
  },
  //获取歌词
  getlyric(id) {
    wx.request({
      url: api + '/lyric', // 仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.lrc.lyric)
      }
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
  playnext(){
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