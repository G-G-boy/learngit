// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    
    allnumber:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var arr = wx.getStorageSync('carts') || [];
    if (arr.length > 0) {
      for (var i in arr) {
        arr[i].selected = false;     //给每个商品添加一个判断是否勾选的属性
      }
      this.setData({
        carts: arr,
        hasList: true
      })
    } 
    // else {
    //   hasList: false   //这是一个错误示范
    // }
   
    this.reddot();

  },

  onHide(){
    this.setData({
      selectAllStatus: false
    })

  },
  onUnload(){
 

   },

  goindex(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    console.log(carts[index].selected)
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
    this.getselectall();                          //通过点击盒子的勾选判断是否为全选状态
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    let arr = wx.getStorageSync('carts') || [];
    const id = e.currentTarget.dataset.id;
    for (let i in arr) {
      if (arr[i].id == id) {
      
          arr[i].num += 1;
          try {
            wx.setStorageSync('carts', arr)
          } catch (e) {
            console.log(e)
          }
        
      }
    }
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let arr = wx.getStorageSync('carts') || [];
    const id = e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    for(let i in arr){
      if(arr[i].id == id){
          if(arr[i].num > 1){
            arr[i].num -= 1;
            try {
              wx.setStorageSync('carts', arr)
            } catch (e) {
              console.log(e)
            }
          }else{
            this.deleteList(e);
          }
      }
    }
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    let arr = wx.getStorageSync('carts') || [];
      for(let i in arr){
        if (arr[i].id == id){
            arr.splice(i,1)
            wx.setStorageSync('carts', arr)
        }
      }
    let carts = this.data.carts;
    carts.splice(index, 1);              // 删除购物车列表里这个商品
    this.setData({
      carts: carts
    });
    if (!carts.length) {                  // 如果购物车为空
      wx.removeStorageSync('carts');
      wx.removeTabBarBadge({
        index: 2,
      })
      this.setData({
        hasList: false              // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
      this.getselectall();                       //通过点击盒子的勾选判断是否为全选状态
      this.reddot();
    }
  },
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let allnum = 0;
    for (let i = 0; i < carts.length; i++) {         
      if (carts[i].selected) {                  
        total += carts[i].num * carts[i].price;     
        allnum += carts[i].num;
      }
    }
    this.setData({                               
      carts: carts,
      totalPrice: total.toFixed(2),
      allnumber:allnum
    });
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },

  getselectall(){                   //通过点击盒子的勾选判断是否为全选状态
      let a = 0;
      let carts = this.data.carts;
      let that = this;
      for(let i = 0;i<carts.length;i++){
        if(carts[i].selected){
           a += 1;
        }
      }

      if(a == carts.length){
         that.setData({
           selectAllStatus:true
         })
      }else{
        that.setData({
          selectAllStatus: false
        })
      }
  },
  gosubmit(e){
    if (this.data.allnumber == 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })
       return;
    }else{
      this.reddot();
      var totalPrice = e.currentTarget.dataset.totalprice;
      wx.navigateTo({
        url: '../submit/submit?totalPrice=' + totalPrice
      })
      this.extract();
    }

  },
  //从购物车缓存中抽出勾选的商品
  extract(){
    var leave = [];
    var submits = [];
       var carts = this.data.carts;
       for(var i in carts){
         if (carts[i].selected){
            delete carts[i].selected;
            submits.push(carts[i])
         }else{
           delete carts[i].selected;
           leave.push(carts[i])      //留下来的商品
         }
       }

       //判断是否全选结算
      if(leave.length > 0){
        wx.setStorageSync('carts', leave)
      }else{
        try {
          wx.removeStorageSync('carts')
          this.setData({
            hasList:false
          })
        } catch (e) {
          console.log(e)
        }
      } 
       try{
        wx.setStorageSync('submits', submits)
       }catch(e){
        console.log(e)
       }
  },
  //实时修改购物车红点
  reddot(){
    
    var rednum = wx.getStorageSync('carts') || [];
    if (rednum.length) {
      wx.setTabBarBadge({
        index: 2,
        text: rednum.length.toString(10)
      })
    }else{
      wx.removeTabBarBadge({
        index: 2
      })
    }


  },
  todetail(e){
    var item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../details/details?details=' + item,
    })
  }






})