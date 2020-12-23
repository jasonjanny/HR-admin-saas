import store from '@/store'
export const checkPermissionMixin = {
  methods: {
    checkPermission(pointName) {
      return store.state.user.userInfo.roles.points.indexOf(pointName) > -1
    }
  }
}
