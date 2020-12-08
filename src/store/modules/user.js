import { setToken, getToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken()
}
// 修改状态
const mutations = {
  setToken(state, data) {
    // 设置token，修改state中token的值
    state.token = data
    // 将token存储到cookie中，数据化持久
    setToken(data)
  }
}
// 执行异步
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

