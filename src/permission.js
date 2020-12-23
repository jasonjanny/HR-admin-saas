import router from '@/router'
import store from '@/store'
// 引入进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

import { asyncRoutes } from '@/router'

// 白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      router.push('/')
    } else {
      // 如果没有id这个值 才会调用 vuex的获取资料的action
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // 过滤
        const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > -1)
        // 根据用户权限给用户配置路由
        router.addRoutes(myRoutes)
        next(to.path)
      } else {
        next()
      }
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
