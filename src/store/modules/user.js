import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken(state, data) {
    // 设置token，修改state中token的值
    state.token = data
    // 将token存储到cookie中，数据化持久
    setToken(data)
  },
  removeToken(state) {
    state.token = ''
  },
  removeUserInfo(state) {
    state.userInfo = {}
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const res = await login(data)
    // 调用 mutations
    context.commit('setToken', res)
  },
  async getUserInfo(context) {
    // 获取基本信息
    const dataUserInfo = await getUserInfo()
    console.log(dataUserInfo)
    // 获取详细信息
    const dataUserDetail = await getUserDetailById(dataUserInfo.userId)
    // 两个信息合并
    const data = {
      ...dataUserInfo,
      ...dataUserDetail
    }
    context.commit('setUserInfo', data)
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

