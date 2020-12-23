import { asyncRoutes } from '@/router'

const state = {

}

const mutations = {

}

const actions = {
  filterRoutes(context, roles) {
    // 过滤
    const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > -1)
    // 在所有路由都添加完毕以后，动态添加一个404重定向
    myRoutes.push({ path: '*', redirect: '/404', hidden: true })
    return myRoutes
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
