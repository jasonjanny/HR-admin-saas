import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 注册全局组件
import Component from '@/components'
Vue.use(Component)

// 注册打印插件
import Print from 'vue-print-nb'
Vue.use(Print)

// 注册自定义指令
import * as directives from '@/directives'
// 遍历所有导出的自定义指令对象，完成自定义全局注册
// 得到的是一个字符串数组
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 注册全局过滤器
import * as filters from '@/filters'
// 遍历
for (const key in filters) {
  const filtersName = key
  const filtersFunction = filters[key]
  // 注册每个过滤器
  Vue.filter(filtersName, filtersFunction)
}

// 注册全局 mixin
import { checkPermissionMixin } from '@/mixin'
Vue.mixin(checkPermissionMixin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
