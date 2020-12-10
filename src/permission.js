import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      return router.push('/')
    } else {
      return next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      return next()
    } else {
      return router.push('/login')
    }
  }
})
