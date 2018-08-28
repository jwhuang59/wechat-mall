const detail_msg = require('../../../config').shop_msg
const WxParse = require('../../../wxParse/wxParse.js')

Page({
  data:{
    detailData:[],
    imgHeight:'',
    num: 1,
    skuIndex:0,
    proName:'',
    disabled:false,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    shopCarInfo:[]
  },
  onLoad: function (options) {
    
    let self = this
    let getCartData = wx.getStorageSync('cartData')
    if (getCartData != ''){
      self.setData({
        hasCarts:true,
        totalNum: getCartData.length
      });
    }
    
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          imgHeight:res.windowWidth
        })

      },
    })
    wx.request({
      url: detail_msg + 'detail',
      data: {
        id: options.detailId,

      },
      success: function (res) {
        self.setData({
          detailData: res.data.data
        });
        let pro_msg = res.data.data.content
        WxParse.wxParse('pro_msg', 'html', pro_msg, self, 5);

      }
    });
    
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      disabled: true,
      num : num
    })
  },
  reduceCount () {
    let num = this.data.num;
    
    if (this.data.num > 1){
      num--;
      this.setData({
        num: num
      })
      if (this.data.num == 1) {
        this.setData({
          disabled: false
        })
      }
    }
   
  
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      hasCarts: true,
      totalNum: num + total
    })

    let cartMsg = {};
    cartMsg.title = this.data.detailData.basicInfo.name
    cartMsg.image = this.data.detailData.pics[0].pic
    cartMsg.num = this.data.num
    if (this.data.proName == ''){
      cartMsg.proname = self.data.detailData.properties[0].childsCurGoods[0].name
    }else{
      cartMsg.proname = this.data.proName

    }
  
    cartMsg.price = this.data.detailData.basicInfo.minPrice
    cartMsg.selected = true;
    let getCartData = wx.getStorageSync('cartData')
    if (this.data.shopCarInfo.length != 0){
      for (let i = 0; i < this.data.shopCarInfo.length; i++) {
        if (cartMsg.title == this.data.shopCarInfo[i].title && cartMsg.proname == this.data.shopCarInfo[i].proname) {

          this.data.shopCarInfo[i].num = cartMsg.num + this.data.shopCarInfo[i].num
        }
        break
      }
    }else{
      
      if (getCartData != ''){
        getCartData.push(cartMsg)
        this.setData({
          shopCarInfo: getCartData

        })
      }else{
        this.data.shopCarInfo.push(cartMsg)

      }

    }
    console.log(getCartData)
    setTimeout(function(){
      wx.setStorage({
        key: 'cartData',
        data: self.data.shopCarInfo,
      })
    },0)

  },
  bindTapSku (e) {
    const sku = parseInt(e.currentTarget.dataset.sku);
    const name = e.currentTarget.dataset.name;
    this.setData({
      skuIndex: sku,
      proName: name
    })
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})