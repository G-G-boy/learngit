const db = wx.cloud.database()
const userinfo = db.collection('userinfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist: []
  },


  onLoad: function(options) {
    userinfo.get().then(res => {
      this.setData({
        userlist: res.data
      })
    })
  },

  getUserInfo(e) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        let countNum = userinfo.where({
          _openid: res.result.openId
        }).count().then(res => {
          if (res.total == 0) {
            userinfo.add({
              data: e.detail.userInfo
            }).then(res => {
              wx.navigateTo({
                url: '../add/add',
              })
            }).catch(err => {
              console.error(err)
            })
          } else {
            wx.navigateTo({
              url: '../add/add',
            })
          }
        })
      }
    })
  }





})