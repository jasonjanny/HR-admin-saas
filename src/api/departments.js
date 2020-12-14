import request from '@/utils/request'

// 获取部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}

// 添加部门
export function addDepartments(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

// 根据id获取部门详情
export function getDepartmentsDetails(id) {
  return request({
    url: '/company/department/' + id
  })
}
