import Lyric from 'lyric-parser'
const api = require('../../utils/api.js');
//const audioCxt = wx.createInnerAudioContext();
const audioCxt = wx.getBackgroundAudioManager();
const WxNotificationCenter = require("../../utils/WxNotificationCenter.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist: app.globalData.playlist,
    app_playindex: app.globalData.playindex,
    statusBarHeight: 0,     //状态栏高度
    centerbtn:true,        //播放按钮
    sliderValue:0,
    musicTime: '0:00',
    allmusictime:'0:00',
    imgsrc:'',
    parseLyric: '', // 歌曲解析后的歌词
    lines:[],         //歌词数组  
    scrollTop:0,
    lineNum:0,
    name:'',
    artists:'',
    imgtablrc:true,    //切换图片和歌词
    imganimation:false,
    tolower:false,  //判断歌词是否到达底部
    isDel: false, // 当前列表是否只有一首歌曲
    mode: 'multiple', // 播放模式
    modebtn:true,//切换播放模式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettophight();
    console.log(app.globalData)
    var item = app.globalData.playlist[app.globalData.playindex];
    if (audioCxt.src == item.murl){
      this.setData({
        centerbtn: !audioCxt.paused,
      })
    }else{
      audioCxt.title = item.name + '-' + item.art;
      audioCxt.coverImgUrl = item.coverImgUrl;
      audioCxt.src = item.murl;
      this.setData({
        centerbtn: true,
      })
    }
    var length = item.dt / 1000;
    var allmusictime = Math.round(length);
              
    this.setData({
      imgsrc: item.coverImgUrl,
      allmusictime: this.musicTimeFormat(allmusictime),
      name: item.name,
      artists:item.art,
      musicTime: this.musicTimeFormat(audioCxt.currentTime),
      parseLyric: new Lyric(item.lyric, this.handleLyric),
      mode: app.globalData.mode,
      playlist: app.globalData.playlist,
      app_playindex: app.globalData.playindex,
    })
    this.setData({
      lines: this.data.parseLyric.lines,
    })    
   this.data.parseLyric.seek(audioCxt.currentTime);
    if (audioCxt.paused) {
      this.data.parseLyric.togglePlay();
    }
    audioCxt.onError(this.onError)   //监听背景音频播放错误事件
    audioCxt.onPrev(this.onPrev)      //监听用户在系统音乐播放面板点击上一曲事件
    audioCxt.onNext(this.onNext)        //监听用户在系统音乐播放面板点击下一曲事件
    audioCxt.onPlay(this.onPlay) // 监听背景音频播放事件
    audioCxt.onPause(this.onPause) // 监听背景音频暂停事件
    audioCxt.onTimeUpdate(this.onTimeUpdate) // 监听背景音频播放进度更新事件
    audioCxt.onEnded(this.onEnded) // 监听背景音频自然播放结束事件
    if (app.globalData.playlist.length == 1) {
      this.setData({
        isDel: true
      })
    }

    if (app.globalData.mode == 'multiple') {
      return;
    } else {
      this.setData({
        modebtn: false
      })
    }  
  },
  onError(){
    if(app.globalData.playlist.length > 1){
      wx.showToast({
        title: '没有版权,即将跳转下一首',
        icon: 'none',
        duration: 1000
      })
      setTimeout(() => {
        this.cutNext();
      }, 3000)
    }else{
      this.goback();
      app.globalData.playlist = [];
      wx.showToast({
        title: '没有版权,再挑一首吧',
        icon: 'none',
        duration: 1000
      })
    }

  },
  onPrev(){
     this.delSongChange('prev');
  },
  onNext(){
     this.delSongChange('next');
  },
  onPlay() {
    this.setData({
      playStatus: true
    })
    this.data.parseLyric.seek(audioCxt.currentTime)
  },
  onPause() {
    this.data.parseLyric.stop();
    this.setData({
      playStatus: false
    })
  },
  onTimeUpdate() {
    let sliderValue = audioCxt.currentTime / audioCxt.duration * 100
    this.setData({
      musicTime: this.musicTimeFormat(audioCxt.currentTime),
      sliderValue: sliderValue,
      allmusictime: this.musicTimeFormat(audioCxt.duration)
    })
  },
  onEnded() {
    this.setData({
      centerbtn: true,
    })
    if (this.data.mode == 'multiple') {
      this.cutNext()
    } else {
      var item = app.globalData.playlist[app.globalData.playindex];
      audioCxt.title = item.name + '-' + item.art;
      audioCxt.coverImgUrl = item.coverImgUrl;
      audioCxt.src = item.murl;
      this.setData({
        scrollTop:0
      })
    }
  },
  cutPrev() { // 上一首
    this.delSongChange('prev')
  },
  cutNext() { // 下一首
    this.delSongChange('next')
  },
  delSongChange(type) { // 切换歌曲
    if(app.globalData.playlist == []){
      audioCxt.stop();
    }
    if (this.data.allmusictime !== 0 && !this.data.isDel) {
      this.data.allmusictime = 0
      this.data.parseLyric.stop()
      if (type == 'prev') {
        if (app.globalData.playindex > 0) {
          app.globalData.playindex--;
        } else {
          app.globalData.playindex = app.globalData.playlist.length - 1
        }
      } else {
        if (app.globalData.playindex < app.globalData.playlist.length - 1) {
          app.globalData.playindex++;
        } else {
          app.globalData.playindex = 0
        }
      }
      let item = app.globalData.playlist[app.globalData.playindex];
      audioCxt.title = item.name + '-' + item.art;
      audioCxt.src = item.murl;
      audioCxt.coverImgUrl = item.coverImgUrl;
      // -------------
      this.postNotice();
      // -------------------
      var length = item.dt / 1000;
      var allmusictime = Math.round(length);
      this.setData({
        imgsrc: item.coverImgUrl,
        allmusictime: this.musicTimeFormat(allmusictime),
        name: item.name,
        artists: item.art,
        musicTime: this.musicTimeFormat(audioCxt.currentTime),
        parseLyric: new Lyric(item.lyric, this.handleLyric),
        centerbtn: true,
        scrollTop: 0,
        app_playindex: app.globalData.playindex,
      })
      this.setData({
        lines: this.data.parseLyric.lines,
      })
      this.data.parseLyric.seek(audioCxt.currentTime)
      if (audioCxt.paused) {
        this.data.parseLyric.togglePlay()
      }
    }
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
  //切换播放暂停
  centerbindtap(){

    if (this.data.centerbtn){
      audioCxt.pause();
      this.data.parseLyric.stop();
    }else{
      audioCxt.play();
      this.data.parseLyric.play();
    }
  
    let centerbtn = !this.data.centerbtn;
    this.setData({
      centerbtn: centerbtn
    })
    
  },
  //进度条改变后触发事件
  audioChange(e) {
    var length = audioCxt.duration;
    var percent = e.detail.value;
    var musicTime = Math.round(length / 100 * percent);
    audioCxt.seek(musicTime);
    audioCxt.onTimeUpdate(this.timeUpdate);
  
    this.setData({
      musicTime: this.musicTimeFormat(musicTime)
    })
  },
  //进度条拖动过程中触发事件
  audioChanging(e) {
    audioCxt.onTimeUpdate(this.offtimeupdate);
    //拖动时修改时间显示
    var length = audioCxt.duration;
    var percent = e.detail.value;
    var musicTime = Math.round(length / 100 * percent);
    this.data.parseLyric.seek(musicTime*1000);
    this.setData({
      musicTime: this.musicTimeFormat(musicTime),
    })
  },
  musicTimeFormat(time) {
    var second = Math.floor(time % 60);
    if (second < 10) {
      second = '0' + second;
    }
    var minute = Math.floor(time / 60);
    if (minute < 10) {
      minute =  minute;
    }
    return minute + ':' + second;
  },
  //播放的时候，更新进度条和时间显示
  timeUpdate() {
    var time = audioCxt.currentTime;
   this.data.parseLyric.seek(time*1000);
    var percent = Math.round(time / audioCxt.duration * 100);
    this.setData({
      musicTime: this.musicTimeFormat(time),
      sliderValue: percent
    })
  },
  handleLyric({ lineNum, txt }){
    this.currentLineNum = lineNum;
    if (lineNum !== 0 && lineNum < this.data.lines.length - 2){
      this.setData({
        lineNum: lineNum
      })
  
     if (lineNum > 5 && lineNum < this.data.lines.length - 2) {
       this.setData({
         scrollTop: (lineNum - 5) * 60,
       })
     }

    } else if (lineNum == this.data.lines.length - 2){

      this.setData({
        lineNum: this.data.lines.length - 1
      })
 
    }
  },
  offtimeupdate(){
    return false;
  },

  imgtablrc(){
    this.timeUpdate();                        //歌词同步
    let imgtablrc = !this.data.imgtablrc;
    let imganimation = !this.data.imganimation;
    this.setData({
      imganimation: imganimation
    })
   var that = this;
      var time = setTimeout(function(){
        that.setData({
          imgtablrc: imgtablrc
        })
      },1000)
  },
  lrctabimg(){
    let imgtablrc = !this.data.imgtablrc;
    let imganimation = !this.data.imganimation;
    this.setData({
      imgtablrc: imgtablrc,
      imganimation: imganimation
    })
  },
  lower(){
    console.log('歌词到底了')
  },
  onUnload() { // 页面卸载
    audioCxt.onError();   
    audioCxt.onPrev();     
    audioCxt.onNext();        
    audioCxt.onTimeUpdate();
    audioCxt.onPlay();
    audioCxt.onPause();
    this.data.parseLyric.stop();
  },
  modebindtap(){
    this.setData({
      modebtn: !this.data.modebtn,
    })
   if(this.data.modebtn){
     this.setData({
       mode:'multiple'
     })
     wx.showToast({
       title: '顺序播放',
       icon: 'none',
       duration: 1000
     })
     app.globalData.mode = 'multiple';
   }else{
     this.setData({
       mode: 'single'
     })
     wx.showToast({
       title: '单曲循环',
       icon: 'none',
       duration: 1000
     })
     app.globalData.mode = 'single';
   }
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
  false1() {
    return;
  },
  playit(e){
    var item = app.globalData.playlist[e.currentTarget.dataset.playindex];
    if (audioCxt.src == item.murl){
      return;
    }else{
      this.data.allmusictime = 0;
      this.data.parseLyric.stop();
      app.globalData.playindex = e.currentTarget.dataset.playindex;
      var item = app.globalData.playlist[app.globalData.playindex];
      audioCxt.title = item.name + '-' + item.art;
      audioCxt.src = item.murl;
      var length = item.dt / 1000;
      var allmusictime = Math.round(length);
      this.setData({
        imgsrc: item.coverImgUrl,
        allmusictime: this.musicTimeFormat(allmusictime),
        name: item.name,
        artists: item.art,
        musicTime: this.musicTimeFormat(audioCxt.currentTime),
        parseLyric: new Lyric(item.lyric, this.handleLyric),
        centerbtn: true,
        scrollTop: 0,
        app_playindex: app.globalData.playindex,
      })
      this.setData({
        lines: this.data.parseLyric.lines,
      })
      this.data.parseLyric.seek(audioCxt.currentTime)
      if (audioCxt.paused) {
        this.data.parseLyric.togglePlay()
      }
    }
  },
  delthesong(e){
    var arr = this.data.playlist.slice(0);
    arr.splice(e.currentTarget.dataset.theindex,1);
    this.setData({
      playlist:arr
    })
    app.globalData.playlist = arr;
  },
  delall(){
    this.setData({
      playlist: [],
    })
    app.globalData.playlist = [];
  },
  postNotice () {
    WxNotificationCenter.postNotificationName("testNotificationItem2Name", { text: "" });
  }
})