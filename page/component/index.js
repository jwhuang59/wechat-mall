const banner_pic = require('../../config').banner_pic

Page({
  data: {
    bannerImg: [],
    mainData:''
  },
  onLoad: function () {
    let that = this
    wx.request({
      url: banner_pic,
      data:{
        type:'banner'
      },
      success: function (res) {
        let arr = []
        for(let i in res.data.data){
          arr.push(res.data.data[i].picUrl)

        }
        that.setData({
          bannerImg: arr
        });

      }
    });
    wx.request({
      url: banner_pic,
      data: {
        type: 'mainImg'
      },
      success: function (res) {
        that.setData({
          mainData : res.data.data
        });

      }
    })

  }
  



})

