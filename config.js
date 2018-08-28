/**
 * 接口配置文件
 */
var host = "https://api.it120.cc"
var subDomain =  "jwhuang"

var config = {

  //接口
  host,
  //商家店铺信息
  subshop: `${host}/${subDomain}/shop/subshop/list`,
  //banner图片地址
  banner_pic: `${host}/${subDomain}/banner/list`,
  //商品信息
  shop_msg: `${host}/${subDomain}/shop/goods/`,
  //商城订单信息
  order_msg: `${host}/${subDomain}/order/`,
  //省份数据
  city_msg: `${host}/common/region/province`
  
};

module.exports = config
