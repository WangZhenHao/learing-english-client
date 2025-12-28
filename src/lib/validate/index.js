/**
 * 简单的邮箱验证（性能更好）
 * @param {string} email - 要验证的邮箱地址
 * @returns {boolean} 是否为有效的邮箱格式
 */
export function isEmailSimple(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim())
  }
  
  export function isPhoneSimple(phone_num) {
    return /^1[3456789]\d{9}$/.test(phone_num)
  }
  