// components/footplayer/footplayer.js
const audioCxt = wx.getBackgroundAudioManager();
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    playerbtn:false,
    footerhidden:true,
    songname:'',
    author:'',
    img:'',
    noticeText: "这里将显示来自不同通知的文字",
  },
  lifetimes: {
     // 在组件实例进入页面节点树时执行
    attached() {
      var that = this;
    app.watch(that.watchBack);
     

    },
    ready(){

    },
     // 在组件实例被从页面节点树移除时执行
    detached() {
 
    },
  },
  pageLifetimes: {
    show() {
      // 页面被展示
      if (app.globalData.playlist.length !== 0){
        this.setData({
          footerhidden:false,
          songname: app.globalData.playlist[app.globalData.playindex].name,
          author: app.globalData.playlist[app.globalData.playindex].art,
          img: app.globalData.playlist[app.globalData.playindex].coverImgUrl,
        })
      }
      if (audioCxt.paused){
        this.setData({
          playerbtn:true
        })
      }
    },
    hide() {
      // 页面被隐藏
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    Toaudioplay(){
      wx.navigateTo({
        url: '../../pages/audioplay/audioplay',
      })
    },
    playerbtn(){
      this.setData({
        playerbtn: !this.data.playerbtn
      })
      if (this.data.playerbtn){
        audioCxt.pause();
      }else{
        audioCxt.play();
      }
    },
    next(){

      if (app.globalData.playindex < app.globalData.playlist.length - 1) {
        app.globalData.playindex++;
      } else {
        app.globalData.playindex = 0
      }
      let item = app.globalData.playlist[app.globalData.playindex];
      audioCxt.title = item.name + '-' + item.art;
      audioCxt.src = item.murl;
      audioCxt.coverImgUrl = item.coverImgUrl;
      this.setData({
        playerbtn: false,
        songname: item.name,
        author: item.art,
        img: item.coverImgUrl,
      })
    },
    watchBack(playindex) {
      console.log(playindex)
    },
    nextitem(){
      let item = app.globalData.playlist[app.globalData.playindex];
      this.setData({
        songname: item.name,
        author: item.art,
        img: item.coverImgUrl,
      })
   }
  }
})
