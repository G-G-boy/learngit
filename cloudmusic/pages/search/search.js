const api = require('../../utils/api.js');
const app = getApp();
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");

Page({
  data: {
    search_hot:[],   //热门搜索
    history_search:[],//历史搜索
    input_value:null,    //输入框的初始内容
    hiddenhistory:false,
    search:true,
    single:[],           //单曲
    limit:30,
    offset:0,
    value:null,
    statusBarHeight: 0,     //状态栏高度
    songsitem:{},
  },
  onLoad: function (options) {
    this.gettophight();
    this.getsearchhot();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },
  onShow(){
    this.gethistory_search();
  },
  //获得热门搜索
  getsearchhot(){
    wx.request({
      url: api + '/search/hot', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
       // console.log(res.data.result.hots)
        this.setData({
          search_hot: res.data.result.hots
        })
      }
    })
  },
  formSubmit(e){
    if (e.detail.value.song === ''){
      return;
    }else{
      this.judge(e.detail.value.song);
      this.getsearch(e.detail.value.song);
      this.setData({
        input_value: null,
        search: false,
        value: e.detail.value.song,
      })
    }
  

  },
  //搜索
  getsearch(keywords){
    wx.request({
      url: api + '/search', // 仅为示例，并非真实的接口地址
      data: {
        keywords: keywords,
        type: 1,
        limit:this.data.limit,
        offset:this.data.offset
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res2 => {
        console.log(res2)
        var offset = this.data.offset;
        var limit = this.data.limit;
        var single = this.data.single.concat(res2.data.result.songs);
        this.setData({
          single: single,
          offset:offset+limit
        })
      }
    })
  },
  //获得历史搜索
  gethistory_search(){
    var history_search = wx.getStorageSync('history_search') || [];
    this.setData({
      history_search: history_search
    })
  },
  //判断缓存内容是否重复并缓存
  judge(text){
    var history_search = wx.getStorageSync('history_search') || [];
    if (history_search.length > 0){
      for (let i in history_search){
        if (history_search[i] === text){
          return;
        }
      }
      history_search.unshift(text);
    }else{
      history_search.unshift(text);
    }
    try{
      wx.setStorageSync('history_search', history_search);
    }catch(e){
      console.log(e)
    }
  },
  //清除历史缓存
  clearhistory_search(){
    wx.removeStorageSync('history_search');
    this.setData({
      hiddenhistory:true
    })
  },
  //点击将按钮的内容传递给input
  setinput(e){
    this.setData({
      input_value: e.currentTarget.dataset.value
    })
  },
  onReachBottom() {
   var value = this.data.value;
    this.getsearch(value);
  },
  goback() {
    wx.navigateBack({
      delta: 1
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
  //输入框聚焦时触发
  inputfocus(){
    this.gethistory_search();
    if (this.data.search){
      return;
    }else{
      this.setData({
        search:true,
        single:[],
        offset:0
      })
    }

  },
  Toaudioplay(e) {
    // console.log(e.currentTarget.dataset)
    // var src = encodeURIComponent(e.currentTarget.dataset.src);
    var arr = [];
    for (let i in e.currentTarget.dataset.artists) {
      arr.push(e.currentTarget.dataset.artists[i].name);
    }
    var artists = arr.join("/");
    // console.log(artists)
    // wx.navigateTo({
    //   url: '../audioplay/audioplay?id=' + e.currentTarget.dataset.id + '&alltime=' + e.currentTarget.dataset.alltime + '&src=' + src
    //     + '&name=' + e.currentTarget.dataset.name + '&artists=' + artists
    // })
    var obj = {
      name: e.currentTarget.dataset.name,
      art: artists,
      coverImgUrl: e.currentTarget.dataset.src,
      murl: 'https://music.163.com/song/media/outer/url?id=' + e.currentTarget.dataset.id + '.mp3',
      lyric:'',
      id: e.currentTarget.dataset.id,
      dt: e.currentTarget.dataset.alltime,
    }
    wx.request({
      url: api + '/lyric', // 仅为示例，并非真实的接口地址
      data: {
        id: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res2 => {
        if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true) {
          obj.lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n"
        } else {
          obj.lyric = res2.data.lrc.lyric;
        }
      },
      fail: err => {

      }
    })
    if (app.globalData.playlist.length == 0) {
      var arr2 = [];
      arr2.push(obj);
      app.globalData.playlist = arr2;
      app.globalData.playindex = e.currentTarget.dataset.playindex;
      app.globalData.mode = 'single';
      wx.navigateTo({
        url: '../audioplay/audioplay',
      })
    }else{
      app.globalData.playlist.splice(app.globalData.playindex + 1, 0, obj);
      app.globalData.playindex ++;
      wx.navigateTo({
        url: '../audioplay/audioplay',
      })
    }
  
  },
  //判断歌曲是否可用
  checkmusic(id){
    wx.request({
      url: api + '/check/music', // 仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
        console.log(res.data)
      }
    })
  },
  showModal(e) {
    var arr = [];
    for (let i in e.currentTarget.dataset.artists) {
      arr.push(e.currentTarget.dataset.artists[i].name);
    }
    var artists = arr.join("/");
    var obj = {
      name: e.currentTarget.dataset.name,
      art: artists,
      coverImgUrl: e.currentTarget.dataset.src,
      murl: 'https://music.163.com/song/media/outer/url?id=' + e.currentTarget.dataset.id + '.mp3',
      lyric: '',
      id: e.currentTarget.dataset.id,
      dt: e.currentTarget.dataset.alltime,
    }
    wx.request({
      url: api + '/lyric', // 仅为示例，并非真实的接口地址
      data: {
        id: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res2 => {
        if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true) {
          obj.lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n"
        } else {
          obj.lyric = res2.data.lrc.lyric;
        }
      },
      fail: err => {

      }
    })
    console.log(obj)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      songsitem: obj,
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