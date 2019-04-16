
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //所有的图片需要同一个尺寸
    height: 0,
    homes:{}
  },

  onLoad(option){
    var details = JSON.parse(option.details);
    this.setData({
      homes:details
    })
  },

  onShow() {


  },

  //设置轮播容器的高度
  setContainerHeight: function (e) {

    //图片的原始宽度
    var imgWidth = e.detail.width;

    //图片的原始高度
    var imgHeight = e.detail.height;

    //同步获取设备宽度
    var sysInfo = wx.getSystemInfoSync();

    //获取屏幕的宽度
    var screenWidth = sysInfo.screenWidth;

    //获取屏幕和原图的比例
    var scale = screenWidth / imgWidth;

    //设置容器的高度
    this.setData({
      height: imgHeight * scale
    })
  },
  toindex(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  tocart(){
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  addcart(e){
   var homes = this.data.homes;
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('carts')||[];
     if(arr.length>0){
       for(var j in arr){
         if(arr[j].id == id){
             arr[j].num += 1;
           try {
             wx.setStorageSync('carts', arr)
           } catch (e) {
             console.log(e)
           }
           wx.showToast({
             title: '加入购物车成功！',
             icon: 'success',
             duration: 2000
           });
           return;
         }
       }
       arr.push(homes);
     }else{
       arr.push(homes);
     }
     try{
       wx.setStorageSync('carts', arr)
       wx.showToast({
         title: '加入购物车成功！',
         icon: 'success',
         duration: 2000
       });
       return;
     }
     catch (e) {
       console.log(e)
     }
  },
  buynow(e){
    this.addcart(e);
    this.tocart();
  },


  onUnload(){
    var rednum = wx.getStorageSync('carts') || [];
    if (rednum.length > 0) {
      wx.setTabBarBadge({
        index: 2,
        text: rednum.length.toString(10)
      })
    }
  }
    
      
})