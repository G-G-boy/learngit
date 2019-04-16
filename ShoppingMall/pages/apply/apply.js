var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// pages/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['省', '市', '区'],
    regionArray: [[], [], []],
    regionOpts: [[], [], []],
    regionIndex: [0, 0, 0],
    prevRegionArray: null,
    prevRegionOpts: null,
    prevRegionIndex: null,
    latitude:'',
    longitude:'',
    name:'',
    unhidden:true,
    location:'',
    captainname:'',
    telnum:''

  },
  onLoad(){
    var address = wx.getStorageSync('address') || [];
    if(address.length > 0){
       this.setData({
         captainname:address[0].userName,
         telnum:address[0].telNumber
       })
    }else{
      return;
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit(e) {
    var information = e.detail.value;
    console.log(information)
    var that = this;
    wx.showModal({
      content: '确定提交?',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          that.formReset();
          that.setData({
            unhidden:false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  formReset(){
   this.setData({
     name:'',
     region: ['省', '市', '区'],
     latitude: '',
     longitude: ''
   })
  },
  getposition(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
          that.setData({
            latitude: latitude,
            longitude: longitude
          })
      }
    })
    this.getLocation();
  },
getLocation(e){
  var that = this;
  qqmapsdk = new QQMapWX({ key:'YZ2BZ-3PU35-2TRIF-QOK2U-Y5PQE-XLFCN'});
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (e) {
          var location = e.result.address;
          console.log(e)
          that.setData({
            location: location
          })
        }
      })
    },
  })

},


})