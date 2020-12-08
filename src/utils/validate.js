/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 校验手机号码
export function validMobile(value) {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(value)
}

// 校验密码
export function validPassword(value) {
  return value.length >= 6 && value.length <= 16
}
