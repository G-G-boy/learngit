const db = wx.cloud.database()
const photos = db.collection('photos')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  upload(){
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;

     for(var i = 0;i < tempFilePaths.length; i ++){
       let tempname = Math.floor(Math.random(0, 1) * 10000000).toString() + '.jpg';
       wx.cloud.uploadFile({
         cloudPath: tempname,
         filePath: tempFilePaths[i], // 文件路径
         success: res => {
           console.log(res.fileID)
           photos.add({
             data: {
               image: res.fileID
             }
           }).then(res => {
             wx.showToast({
               title: '上传成功',
               icon: 'success'
             })
           })
         },
         fail: err => {
      
         }
       })
     }
    
 
      },
      fail:err => {
        console.error(err)
      }
    })
  }
})