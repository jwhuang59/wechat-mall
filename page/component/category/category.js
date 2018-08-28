const category_msg = require('../../../config').shop_msg

Page({
    data: {
        category: [],
        detailList:[],
        curIndex: 0,
        isScroll: false,
        type: 'skin-care'
    },
    onReady(){
        var self = this;
        wx.request({
          url: category_msg +'category/all',
          success: function (res) {
            
            self.setData({
              category: res.data.data
            });

          }
        });
        
    },
    switchTab(e){
      const self = this;
      setTimeout(function(){
        self.setData({
          type: e.target.dataset.type,
          curIndex: e.target.dataset.index
        })
      },0)
        
    }
    
})