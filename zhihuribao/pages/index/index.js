// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list:[],
    date:0,
    windowHeight:555,
    panduang:'true',
    list_length:0,
    xianshi:true,
    olddate:0
    
  },

 
  onLoad: function () {


  
  this.requestData();
    var that = this;
    wx.getSystemInfo({
      success(res) {
         that.setData({
           windowHeight: res.windowHeight
         })
      }
    })
   

  },

  insertStr(soure, start, newStr){

    return soure.slice(0, start) + newStr + soure.slice(start);
  },
   requestData(){

     var that = this;
     var api = 'https://news-at.zhihu.com/api/4/news/latest';

     wx.request({
       url: api,
       header: {
         'content-type': 'application/json' // 默认值
       },
       success(res) {
         console.log(res.data)


      
         that.setData({
           list:[{
             mystories: res.data.stories,
             mydate:'今日要闻'
           }],
           imgUrls: res.data.top_stories,
           date: res.data.date,
           list_length: res.data.stories.length
   
         })
         that.requestoldData(res.data.date);
       }
   
     })
  },
   gonews(event) {
 

     var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../news/news?id='+id
    })

  },
loadmore(){

  var olddate = this.data.date;
  this.requestoldData(olddate);



},
  requestoldData(olddate){
        
      var that = this;
    var api = 'https://news-at.zhihu.com/api/4/news/before/'+olddate;

    wx.request({
      url: api, // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
   
        var datestring = res.data.date;
        var datestringtostring = datestring.toString();
        var a = that.insertStr(datestringtostring, 4, '年');
        var b = that.insertStr(a, 7, '月');
        var c = that.insertStr(b, 10, '日');




        that.data.list.push({
          mystories: res.data.stories,
          mydate:c
        });
      
        var old = res.data.date ;
        that.setData({
          list: that.data.list,
          date: res.data.date,
          list_length: res.data.stories.length,
          olddate: old
        })
      }

  
    })

  }
    


})