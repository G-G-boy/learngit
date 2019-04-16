// components/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    toastShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast() {
      this.setData({
        toastShow: !this.data.toastShow 
      })

      var that = this


      setTimeout(function () {
        that.setData({
          toastShow: !that.data.toastShow
        })
      }, 6000)
    }
  }  
  
})
