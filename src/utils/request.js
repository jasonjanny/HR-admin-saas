// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { store } from '@/store'
// 创建一个axios的实例
const service = axios.create({
  // 设置axios请求的基础的基础地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 定义5秒超时
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 解构数据
  const { message, success, data } = res.data
  if (success) {
    Message.success(message)
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
export default service // 导出axios实例

