import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo(token) {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function getUserDetailById(id) {
  return request({
    url: '/sys/user/' + id
  })
}

export function logout() {

}
