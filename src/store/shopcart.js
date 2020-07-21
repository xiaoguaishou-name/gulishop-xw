import {
  reqAddOrUpdateShopCart
} from '@/api'
const state = {}
const mutations = {}
const actions = {
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      return '添加购物车成功'
    } else {
      return Promise.reject(new Error('添加购物车失败，您的网络迷路了呦'))
    }
  }
}
const getters = {}
export default ({
  state,
  mutations,
  actions,
  getters
})