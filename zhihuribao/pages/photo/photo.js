const db = wx.cloud.database()
const photos = db.collection('photos')
Page({


  data: {
   photo:[]
  },

  onLoad: function (options) {
    photos.doc(options.id).get().then(res => {
      this.setData({
        photo:res.data.image
      })
    })
  },
  download(){
    wx.cloud.downloadFile({
      fileID:this.data.photo
    }).then(res => {
      console.log(res.tempFilePath)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success:res => {
          console.log('保存图片成功')
         },
         fail:err => {
           console.error(err)
         }
      })
    }).catch(error => {
      console.error(error)
    })
  }
 
})