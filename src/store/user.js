import {
  reqRegister,
  reqLogin,
  reqLogOut
} from '@/api'
import {
  getUserTempId
} from '@/utils/userabout'
const state = {
  userTempId: getUserTempId(),
  userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
}
const mutations = {
  RECEIVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  RESERUSERINFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  async userRegister({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code === 200) {
      return '成功'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  async userLogin({ commit }, userInfo) {
    const result = await reqLogin(userInfo)
    if (result.code === 200) {
      //把用户的信息保存起来,为了自动登录
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      commit('RECEIVEUSERINFO', result.data)
    }
  },
  async userLogOut({ commit }) {
    const result = await reqLogOut()
    if (result.code === 200) {
      // 退出登陆后清除信息
      localStorage.removeItem('USERINFO_KEY')
      commit('RESERUSERINFO')
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