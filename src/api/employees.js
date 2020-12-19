import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 导入员工
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

// 保存员工基本信息
export function saveUserDetailById(data) {
  return request({
    method: 'put',
    url: '/sys/user/' + data.id,
    data
  })
}
