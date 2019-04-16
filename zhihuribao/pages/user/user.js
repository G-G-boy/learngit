const db = wx.cloud.database()
const userinfo = db.collection('userinfo')
const photos = db.collection('photos')
Page({

  data: {
      userInfo:[],
      photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
   userinfo.where({
     _openid:options.id
   }).get().then(res => {
        photos.where({
          _openid:options.id
        }).get().then(res2 => {
          this.setData({
            userInfo:res.data[0],
            photos:res2.data
          },res => {
            wx.hideLoading()
          })
        })
    
   })
  },

 
})