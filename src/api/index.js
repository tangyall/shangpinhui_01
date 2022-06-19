import requests from "./ajax";
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList     get请求   无参数
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })

// export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqGetBannerList = () => mockRequests({ 
  url: '/banner', 
  method: 'get' 
});

export const reqFloorList = () => mockRequests({
  url: '/floor',
  method: 'get'
})

// 获取搜索模块数据     /api/list        post
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

// 获取商品详情信息   /api/item/{ skuId }    GET
export const reqGoodsInfo = (skuId) => requests({
  url: '/item/' + skuId,
  method: 'get',
})

// 将产品添加到购物车中，或者更新购物车中产品的个数   /cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${ skuId }/${ skuNum }`,
  method: 'post'
})

// 获取购物车列表的请求   /cart/cartList
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

// 获取购物车产品的接口     /cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete',
}) 

// 修改购物车商品的选中状态   /cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码  /api/user/passport/sendCode/{phone}     get
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册用户      /api/user/passport/register    post
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  method: 'post',
  data
}) 

// 登录   /api/user/passport/login    post
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data
})

// 获取用户信息【需要带着用户的token向服务器要用户信息      /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登录    /api/user/passport/logout         get
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

// 获取用户地址信息     /api/user/userAddress/auth/findUserAddressList      get
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

// 获取商品交易清单       /api/order/auth/trade       get
export const reqOrderList = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

// 提交订单的接口       /api/order/auth/submitOrder?tradeNo={tradeNo}     post
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data
})

// 获取订单支付信息     /api/payment/weixin/createNative/{orderId}        get
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`, 
  method: 'get'
})

// 获取支付订单状态       /api/payment/weixin/queryPayStatus/{orderId}   get
export const reqStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

// 获取订单列表            /api/order/auth/{page}/{limit}    get
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})