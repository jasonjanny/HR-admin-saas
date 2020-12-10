import router from '@/router'
import store from '@/store'
// 引入进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      router.push('/')
    } else {
      // 如果没有id这个值 才会调用 vuex的获取资料的action
      if (!store.getters.userId) {
        store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      router.push('/login')
    }
  }

  // 手动关闭一次，修复手动切换页面地址或刷新时无法
  NProgress.done()
})

// 后置守卫
router.afterEach(() => {
  NProgress.done()
})
