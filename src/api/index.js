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
