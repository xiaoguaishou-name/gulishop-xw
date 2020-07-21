import {
  reqGoodsList
} from '@/api'
const state = {
  goodsListInfo:{}
}
const mutations = {
  RECEIVEGOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo
  }
}
const actions = {
  // searchParams是用来接受组件dispatch传递过来的参数对象，如果是一个数据则可以直接接收，如是多个数据，必须封装成对象传递过来
  async getGoodsListInfo({commit},searchParams) {
    const result = await reqGoodsList(searchParams)
    if (result.code === 200) {
      commit('RECEIVEGOODSLISTINFO',result.data)
    }
  }
}
const getters = {
  attrsList(state) {
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state) {
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state) {
    return state.goodsListInfo.trademarkList || []
  }
  
}
export default ({
  state,
  mutations,
  actions,
  getters
})