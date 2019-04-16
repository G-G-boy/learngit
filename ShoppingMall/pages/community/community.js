
Page({

  data: {
    community:[
      {
        community: "AAAA社区", name: "A团长", img: '../../img/4x3-1.jpg', address: 'xx省xx市xx区xx镇xx村xx路xx座'
      }
    ]
  },

  onLoad: function (options) {
    var item = JSON.parse(options.item);
    this.setData({
      item:item
    })
 
  },
  onShow: function () {
     let community = [
       {
         community: "AAAA社区", name: "A团长", img: '../../img/4x3-1.jpg', address:'广州市番禺区xx街xx区1号'
       },
       {
         community: "BBBB社区", name: "B团长", img: '../../img/4x3-2.jpg', address: '广州市番禺区xx街xx区1号'
       },
       {
         community: "CCCC社区", name: "C团长", img: '../../img/4x3-3.jpg', address: '广州市番禺区xx街xx区1号'
       },
       {
         community: "DDDDD社区", name: "D团长", img: '../../img/4x3-4.jpg', address: '广州市番禺区xx街xx区1号'
       }
     ]
    this.setData({
      community: community
    })
  },
  toindex(e){
    var item = JSON.stringify(e.currentTarget.dataset.item);
    wx.reLaunch({
      url: '../index/index?item=' + item,
    })
  }

  
})