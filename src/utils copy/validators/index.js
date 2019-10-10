export default {
  // 手机号验证
  phone(rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    } else {
      const phoneRegExp = /^[1]\d{10}$/
      if (phoneRegExp.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
  },
  // 验证 HH:mm 格式
  validateHHmm(rule, value, callback) {
    if (value != null && value.replace(/(^\s*)|(\s*$)/g, '').length > 0) {
      const colonIndex = value.indexOf(':')
      const hour = Number(value.substring(0, colonIndex))
      const minute = Number(value.substring(colonIndex + 1))
      if (hour >= 0 && minute >= 0 && minute <= 60) {
        callback()
      } else {
        callback(new Error('请输入有效HH:mm格式！'))
      }
    } else {
      callback(new Error('请输入有效HH:mm格式！'))
    }
  },
  // 检测网址
  validateUrl(rule, value, callback) {
    /* eslint-disable no-useless-escape */
    const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
    if (!urlReg.test(value)) {
      callback(new Error('请输入有效的网址！'))
    } else {
      callback()
    }
  },
  // 正整数校验
  positiveIntegerOnly(rule, value, callback) {
    if (!integerOnly(value)) {
      callback(new Error('只能输入正整数'))
      return
    } else if (!upperZero(value)) {
      callback(new Error('数量必须大于0'))
    } else {
      callback()
    }
  },
  // 整数校验
  integerOnly(rule, value, callback) {
    if (!integerOnly(value)) return callback(new Error('正能输入整数'))
    callback()
  },
  // 正整数
  validIntegerUpperZero(rule, value, callback) {
    const reg = /^[1-9]\d*$/g
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的内容'))
    } else {
      return callback()
    }
  },
  // 正整数+0
  validInteger(rule, value, callback) {
    if (!value) {
      return callback()
    }
    const reg = /^\d+$/g
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的内容'))
    } else {
      return callback()
    }
  }
}

function integerOnly(val) {
  const reg = /\D?^0/g
  return !(reg.test(val))
}

function upperZero(val) {
  return Number(val) > 0
}
