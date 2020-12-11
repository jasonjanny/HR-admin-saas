// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'
// 创建一个axios的实例
const service = axios.create({
  // 设置axios请求的基础的基础地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 定义5秒超时
  timeout: 5000
})

const timeout = 7200
// 请求拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 超时
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token已经失效，请重新登录'))
    } else {
      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 解构数据
  const { message, success, data } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    // 返回一个Promise reject，返回一个错误对象
    return Promise.reject(new Error(message))
  }
}, err => {
  // 状态码直接错误
  Message.error(err.message)
  return Promise.reject(new Error(err.message))
})

function isCheckTimeout() {
  // 获取当前时间戳
  const now = Date.now()
  // 获取登录时保存的时间戳
  const savedTime = getTimeStamp()
  console.log(now)
  console.log(savedTime)
  // 将两个时间戳进行判断
  return (now - savedTime) / 1000 >= timeout
}
export default service // 导出axios实例
