// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Images: [
      { imgId: '0', linkUrl: 1, img_url: '../../img/4x3-1.jpg' },
      { imgId: '1', linkUrl: 2, img_url: '../../img/4x3-2.jpg' },
      { imgId: '2', linkUrl: 3, img_url: '../../img/4x3-3.jpg' },
      { imgId: '2', linkUrl: 3, img_url: '../../img/4x3-4.jpg' },
    ],
    selected: false,
    selected1: true,
    selected2: false,
    currentTab:0,
    windowHeight:667,
    homes:[],
    homes1:[],
    swiperscroll: 740,
    none:false,
    mencen:false,
    TabCur: 0,
    scrollLeft: 0,
    item: {}//首页顶部

   
  },

  onShow() {
    var arr = [
      {
        id: 44, title: 'aaaaaaaaa', img: '../../img/4x3-1.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 33, title: 'bbbbbbbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 22, title: 'bbbbb222222bbb', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 23, title: 'bbbbb34444bbb', img: '../../img/4x3-3.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 334, title: 'bbbbbb55555bb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 3223, title: 'bbbbb66666bbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      },
      {
        id: 32223, title: 'bbbbb777777bbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
        image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
      }
    ];

    var arr1 = [
      {
        tab:'男装',
        shop:[
          {
            id: 4411135667, title: '男装aaaaaaaaa', img: '../../img/4x3-1.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 3311777891, title: '男装bbbbbbbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 221889011, title: '男装bbbbb222222bbb', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 44143311, title: '男1111111a', img: '../../img/4x3-1.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 3311771, title: '男装2222222bbbbbbbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 221889011, title: '男装b3333333bbbb222222bbb', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          }
        ]
      },
      {
        tab: '女装',
        shop: [
          {
            id: 44222, title: '女装aaaaaaaaa', img: '../../img/4x3-1.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 33222, title: '女装bbbbbbbb', img: '../../img/4x3-3.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 22222345, title: '女装bbbbb222222bbb', img: '../../img/4x3-2.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          }
        ]
      },
      {
        tab: '鞋包',
        shop: [
          {
            id: 44333, title: '鞋包aaaaaaaaa', img: '../../img/4x3-2.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 33333356, title: '鞋包bbbbbbbb', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 2336782, title: '鞋包bbbbb222222bbb', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          }
        ]
      },
      {
        tab: '水果',
        shop: [
          {
            id: 433564, title: '水果1111111', img: '../../img/4x3-3.jpg', price: 0.01, sold: 4, onlyleft: 999, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 346793, title: '水果222222', img: '../../img/4x3-4.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          },
          {
            id: 22358, title: '水果3333333', img: '../../img/4x3-1.jpg', price: 0.03, sold: 3, onlyleft: 666, num: 1,
            image: ['../../img/4x3-1.jpg', '../../img/4x3-2.jpg', '../../img/4x3-3.jpg', '../../img/4x3-4.jpg'],
          }
        ]
      },
      {
        tab:'蔬菜'
      },
      {
        tab: '蔬菜'
      },
      {
        tab: '蔬菜'
      },
      {
        tab: '蔬菜'
      },
      {
        tab: '蔬菜'
      },
      {
        tab: '蔬菜'
      },
      {
        tab: '蔬菜'
      },

    ]

    this.setData({
      homes:arr,
      homes1:arr1
    })
   
   //滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })

    var rednum = wx.getStorageSync('carts') || [];
    if (rednum.length > 0) {
      wx.setTabBarBadge({
        index: 2,
        text: rednum.length.toString(10)
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.item){
      var item = JSON.parse(options.item);
    }else{
      item = {
        community: "AAAA社区", name: "A团长", img: '../../img/4x3-1.jpg', address: '广州市番禺区xx街xx区1号'
      } 
    }
   
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowHeight: res.windowHeight,
          item:item
        })
      }
    })
  



  
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  selected: function () {
    this.setData({
      selected1: false,
      selected: true,
      selected2:false
    })
  },
  selected1: function () {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function () {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //滑动切换
  swiperTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
 // 点击切换
  clickTab: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  addcart(e) {
    var homes = this.data.homes;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var arr = wx.getStorageSync('carts') || [];
    if (arr.length > 0) {
      for (var j in arr) {
        
           if(arr[j].id == id){
             arr[j].num += 1;
             try {
               wx.setStorageSync('carts', arr)
             } catch (e) {
               console.log(e)
             }
             wx.showToast({
               title: '加入购物车',
               icon: 'success',
               duration: 2000
             });
             return;
           }
         
      }
      arr.push(homes[index]);
      console.log(arr)
    } else {
      arr.push(homes[index]);
      console.log(arr)
    }
    try {
      wx.setStorageSync('carts', arr)
      wx.showToast({
        title: '加入购物车',
        icon: 'success',
        duration: 2000
      });
        //添加购物车小红点
      wx.setTabBarBadge({
        index: 2,
        text: arr.length.toString(10)
      })
      return;
    }
    catch (e) {
      console.log(e)
    }
  },
  godetails(e){
    var details = JSON.stringify(e.currentTarget.dataset.details);
    wx.navigateTo({
      url: '../details/details?details='+details,
    })
  }
  , gocoupon(){
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  }
   , scroll(e) {
     var that = this;
     var deltay = e.detail.deltaY;
    var scrolltop = e.detail.scrollTop * 2;
     that.setData({
       swiperscroll: 740 - scrolltop,
       mencen:true
     })
     if (deltay < 0 &&scrolltop>740){
       that.setData({
         none:true
       })
     } else if(deltay > 0 && scrolltop < 4){
      
       that.setData({
         none:false,
         mencen: false
     
       })
     }
  }

  , loadmore(){
    console.log('加载更多...')
  }
  , addcart1(e) {
    var TabCur = this.data.TabCur;
    var index = e.currentTarget.dataset.index;
    var homes1 = this.data.homes1[TabCur].shop;
    console.log(homes1)
    var id = e.currentTarget.dataset.id;
 
    var arr = wx.getStorageSync('carts') || [];
    if (arr.length > 0) {
      for (var j in arr) {

        if (arr[j].id == id) {
          arr[j].num += 1;
          try {
            wx.setStorageSync('carts', arr)
          } catch (e) {
            console.log(e)
          }
          wx.showToast({
            title: '加入购物车',
            icon: 'success',
            duration: 2000
          });
          return;
        }

      }
      arr.push(homes1[index]);
      console.log(arr)
    } else {
      arr.push(homes1[index]);
      console.log(arr)
    }
    try {
      wx.setStorageSync('carts', arr)
      wx.showToast({
        title: '加入购物车',
        icon: 'success',
        duration: 2000
      });
      //添加购物车小红点
      wx.setTabBarBadge({
        index: 2,
        text: arr.length.toString(10)
      })
      return;
    }
    catch (e) {
      console.log(e)
    }
  },
  onPullDownRefresh(){
    console.log('触发了下拉刷新事件')
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '正在拼命加载喵~'
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '喵喵喵~'
      })
    }
      , 3000);
    
  },
  onReachBottom(){

    console.log('触发了上拉加载事件')
  },
  tocommunity(e){
    var item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../community/community?item=' + item
    })
   }

})