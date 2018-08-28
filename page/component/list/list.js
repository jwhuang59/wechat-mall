const detail_list = require('../../../config').shop_msg

Page({
  data: {
    detailList: [],
    num: 1,
    orderBy:'',
    priceSort: ''
  },
  onLoad: function (options) {
    let self = this
    self.categoryId = options.categoryId
    self.requestInfo(self.categoryId,'');
    
  },
  requestInfo (id,sort) {
    let self = this
    wx.request({
      url: detail_list + 'list',
      data: {
        categoryId: id,
        orderBy: sort
      },
      success: function (res) {

        self.setData({
          detailList: res.data.data
        });

      }
    });

  },
  onReady() {
    
    

  },
  navClick (e) {
    let self = this;
    self.setData({
      num: e.target.dataset.num,
      orderBy: e.target.dataset.sort,
    })
    if (e.target.dataset.num == 3){
      
      if (self.data.priceSort == 'priceUp'){
        self.setData({
          priceSort: 'priceDown',
          orderBy: 'priceDown'
        })

      } else if (self.data.priceSort == 'priceDown'){
        self.setData({
          priceSort: 'priceUp',
          orderBy: 'priceUp'
        })

      } else if (self.data.priceSort == ''){
        self.setData({
          priceSort: 'priceUp',
          orderBy: 'priceUp'
        })

      }

    }else{
      self.setData({
        priceSort:''
      })

    }

    setTimeout(function () {
      self.requestInfo(self.categoryId, self.data.orderBy);
    }, 0)
    

  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})