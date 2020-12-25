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
// Vue.use(ElementUI)

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

// i18n
import i18n from '@/i18n'
// 本来饿了么ui 通过引入语言包, 在配置中设定 locale 来翻译
// Vue.use(ElementUI, {locale})
// 我们不想要饿了么自己翻译, 而是想将翻译的工作交给 i18n
Vue.use(ElementUI, {
  // i18n 是一个属性, 可以传入一个函数, 自动获取到当前饿了么想要翻译的key
  // 只需要在这个函数中返回, 对应的文字即可
  i18n: key => i18n.t(key)
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
