// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// 创建一个axios的实例
const service = axios.create({
  // 设置axios请求的基础的基础地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 定义5秒超时
  timeout: 5000
})
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use() // 响应拦截器
export default service // 导出axios实例

