const api = require('../../utils/api.js');
const id2Url = require('../../utils/base64md5.js');
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1884493908,2615694705&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1072588026,3407490968&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781162231,2154411515&fm=26&gp=0.jpg'
    ],
    cardCur: 0,
    Recommend_Songs:[],    //推荐歌单
    statusBarHeight:0,     //状态栏高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSongs();
    this.getnewsongs();
    this.gettophight();
    var that = this;
    WxNotificationCenter.addNotification("testNotificationItem2Name", that.testNotificationFromItem2Fn, that);
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ToRankingList(){
    wx.navigateTo({
      url: '../RankingList/RankingList',
    })
  },
  Torecommend(){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  Tosonglistdetails(e){
    wx.navigateTo({
      url: '../songlistdetails/songlistdetails?id=' + e.currentTarget.dataset.id,
    })
  },
  Tosongsheet(){
    wx.navigateTo({
      url: '../songsheet/songsheet',
    })
  },
  getRecommendSongs(){
    wx.request({
      url: api + '/personalized', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res => {
        console.log(res.data.result)
        let playlists = res.data.result;
        let arr = [];
        for (let i in playlists) {
          let obj = {
            id: 0,
            name: '',
            picUrl: '',
            playCount: 0,
          }
          obj.id = playlists[i].id;
          obj.name = playlists[i].name;
          obj.picUrl = playlists[i].picUrl;
          obj.playCount = this.playCounttostr(playlists[i].playCount);
          arr.push(obj);
        }
        this.setData({
          Recommend_Songs: arr
        })
      }
    })
  },
  //获取推荐新音乐
  getnewsongs(){
    wx.request({
      url: api + '/personalized/newsong', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        var arr = res.data.result;
   
        console.log(res.data.result)
        for(let i in arr){
          wx.request({
            url: api + '/lyric', // 仅为示例，并非真实的接口地址
            data: {
              id: res.data.result[i].id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res2 => {
              if (res2.data.uncollected == true || res2.data.nolyric == true || res2.data.needDesc == true){
                arr[i].lyric = "[by:ggboy]\n[00:00.000] 作曲 : ggboy\n[00:00.133] 作词 : ggboy\n[00:04.160]没有歌词\n[00:06.200]所以我做了这段歌词\n[00:08.290]希望你们没有歌词也能好好听歌\n";
              }else{
                arr[i].lyric = res2.data.lrc.lyric;
              }
            },
            fail: err => {

            }
          })
          var arr2 = [];
          for (let a in arr[i].song.artists) {
            arr2.push(arr[i].song.artists[a].name);
          }
          var artists = arr2.join("/");
          arr[i].art = artists;
          arr[i].murl = 'https://music.163.com/song/media/outer/url?id=' + arr[i].id + '.mp3';
          arr[i].coverImgUrl = arr[i].song.album.picUrl + '?param=200y200';
          arr[i].dt = arr[i].song.duration;
        }
        this.setData({
          newsongs: arr
        })
      }
    })
  },
  Tosearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //获取状态栏高度
  gettophight(){
    wx.getSystemInfo({
      success:res => {
        this.setData({
          statusBarHeight: res.statusBarHeight*2
        })
      }
    })
  },
  Toaudioplay(e) {
    console.log(e.currentTarget.dataset)
    var src = encodeURIComponent(e.currentTarget.dataset.src);
    var arr = [];
    for (let i in e.currentTarget.dataset.artists){
      arr.push(e.currentTarget.dataset.artists[i].name);
    }
    var artists = arr.join("/");
    // wx.navigateTo({
    //   url: '../audioplay/audioplay?id=' + e.currentTarget.dataset.id + '&alltime=' + e.currentTarget.dataset.alltime + '&src=' + src 
    //     + '&name=' + e.currentTarget.dataset.name + '&artists=' + artists
    // })
    app.globalData.playlist = this.data.newsongs;
    app.globalData.playindex = e.currentTarget.dataset.playindex;
    app.globalData.mode = 'multiple';
    wx.navigateTo({
      url: '../audioplay/audioplay',
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
  //私人fm
  Topersonal_fm(){
    // wx.request({
    //   url: api + '/fm', // 仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:res => {
    //     console.log(res.data.data)
    //   }
    // })
    wx.showToast({
      title: '这个还没做',
      icon: 'none',
      duration: 1000
    })
  },
  aboutme(){
    wx.showToast({
      title: '一个很纯粹的人',
      icon:'none',
      duration:2000,
    })
  },
  //这是一个带参数的例子，info为对象
  testNotificationFromItem2Fn: function (info) {//这是也给带参数的例子，info为字符串
    var footplayer = this.selectComponent("#footplayer");
    footplayer.nextitem();
  },
 

})