import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
import { Message } from 'element-ui'
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
const actions = {
  async login(context, data) {
    const res = await login(data)
    const { message, success } = res.data
    if (success) {
      // 弹窗
      Message.success(message)
      // 调用 mutations
      context.commit('setToken', data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

