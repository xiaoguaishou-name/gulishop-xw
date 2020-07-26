//这个文件是项目的接口请求函数文件
//给每个接口发送请求，我们都把它封装成一个函数,到时需要拿请求数据时，就去调用对应的接口函数就完了
import Ajax from '@/ajax/Ajax'
//请求获取三级分类列表数据
//  /api/product/getBaseCategoryList  GET  参数：无
// const reqCategoryList = () => Ajax.get('/api/product/getBaseCategoryList') //对象形式
//函数形式
export const reqCategoryList = () => Ajax({
  url: '/product/getBaseCategoryList',
  method:'GET'
})
//使用mock接口去请求banner数据  get请求  /banner
import mockAjax from '@/ajax/mockAjax'
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')

// 请求search商品搜索列表数据  post  /api/list  data(初始空的对象，无搜索，返回所有数据)
export const reqGoodsList = (searchParams) => Ajax.post('/list', searchParams)

//请求商品详情页数据
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${skuId}`)

//请求添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => Ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

//获取购物车列表数据
export const reqShopCartList = () => Ajax.get('/cart/cartList')

//请求修改购物车选中状态
export const reqUpdateIsChecked = (skuID,isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)


//请求删除购物车商品 
export const reqDeleteCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`)

//请求注册   /api/user/passport/register   post
export const reqRegister = (userInfo) => Ajax.post('/user/passport/register', userInfo)


//请求登录
export const reqLogin = (userInfo) => Ajax.post('/user/passport/login', userInfo)

//退出登录    /api/user/passport/logout   get
export const reqLogOut = () => Ajax.get('/user/passport/logout')

//请求订单交易信息(结算前的信息确认)
export const reqtradeInfo = () => Ajax.get('/order/auth/trade')

//请求创建订单信息(里面就是直接付款)
export const reqSubmitOrder = (tradeNo, tradeInfo) => Ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfo)

//请求获取订单信息
export const reqOrderInfo = (orderId) => Ajax.get(`/payment/weixin/createNative/${orderId}`)

//请求查看订单的支付信息
export const reqPayStatus = (orderId) => Ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

//请求获取我的订单列表信息
export const reqMyOrder = (page,limit) => Ajax.get(`/order/auth/${page}/${limit}`)