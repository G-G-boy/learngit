var util = require('../../utils/util.js')
// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addAddress:true,
    submit:[],
    totalPrice:0,
    addressinfo:null
  },
  onShow(){
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('submits');
    var addressinfo = wx.getStorageSync('address') || [];
    this.setData({
      submit: arr,
      totalPrice: options.totalPrice
    })
    if(addressinfo.length > 0){
      this.setData({
        addressinfo: addressinfo[0],
        addAddress: false
      })
    }else{
      console.log('请添加地址')
    }
  },
  addAddres(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          var arr = wx.getStorageSync('address') || [];
          if (arr.length > 0) {
            arr.splice(0,1,res);
          } else {
            arr.splice(0, 1, res);
          }
          try {
            wx.setStorageSync('address', arr);
            that.setData({
              addressinfo:arr[0],
              addAddress:false
            })
            wx.showToast({
              title: '选择成功',
              icon: 'success',
              duration: 2000
            });
            return;
          } catch (e) {
            console.log(e)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
     
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  payment(){
   var that = this;
    var arr = wx.getStorageSync('address') || [];
if(arr.length){
    wx.showModal({
      title: '提示',
      content: '确定支付？',
      success(res) {
        if (res.confirm) {
          that.stoOrder('paidorder','待发货',false);
          that.stoOrder('allorder','待发货',false);
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '已取消支付',
                  icon: 'success',
                  duration: 2000
                })
          that.stoOrder('cancelorder','交易已取消',true);
          that.stoOrder('allorder','交易已取消',true);
        }
      }
    })
}else{
  wx.showToast({
    title: '请选择收货地址',
    icon: 'none',
    duration: 1000
  })
}
  },
  //将订单内的商品信息，总价，下订单的时间打包
  toOrder(str, boolean){
    var date_time = util.formatTime(new Date());
    var order = {
      'date_time': date_time,
      'totalPrice': this.data.totalPrice,
      'submits': this.data.submit,
      'submitslength': this.data.submit.length,
      'state':str,
      'cancel':boolean,
      'addressinfo': this.data.addressinfo
    };
    return order;
  },



  stoOrder(str1, str2, boolean) {
    var toOrder = wx.getStorageSync(str1) || [];
    var order = this.toOrder(str2, boolean);
      toOrder.push(order);
    try {
      wx.setStorageSync(str1, toOrder)
    } catch (e) {
      console.log(e)
    }
  }



  })
  
  