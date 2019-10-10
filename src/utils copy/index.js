import _ from 'lodash'

const hiddenProperty = (() => {
  // document[hiddenProperty] 可以判断页面是否失焦
  let names = ['hidden', 'webkitHidden', 'mozHidden', 'msHidden']
  names = names.filter(e => e in document)
  return names.length > 0 ? names[0] : false
})()
const visibilityChangeEvent = (() => {
  if (!hiddenProperty) {
    return false
  }
  return hiddenProperty.replace(/hidden/i, 'visibilitychange') // 如果属性有前缀, 相应的事件也有前缀
})()

function fmtDate(td, fmtExp) {
  if (!td) {
    return ''
  }
  if (typeof td === 'string' && td.indexOf('-') !== -1) {
    td = td.replace(/-/g, '/')
  }
  const date = new Date(td)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  let dateFmt = fmtExp
  if (/(y+)/.test(dateFmt)) {
    dateFmt = dateFmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(dateFmt)) {
      dateFmt = dateFmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return dateFmt
}

export default {
  // 日期格式化方法
  fmtDate: fmtDate,
  getDate(td) {
    if (td instanceof Date) {
      const dateStr = this.fmtDate(td.getTime(), 'yyyy-MM-dd')
      return new Date(dateStr).getTime() - 28800000
    }
    return null
  },
  getStartDate(td) {
    return this.getDate(td)
  },
  getEndDate(td) {
    if (td instanceof Date) {
      const dateStr = this.fmtDate(td.getTime(), 'yyyy-MM-dd')
      return new Date(dateStr).getTime() + 57600000
    }
    return null
  },
  getTodayLastTime(td) {
    if (td instanceof Date) {
      const dateStr = this.fmtDate(td.getTime(), 'yyyy-MM-dd')
      return new Date(dateStr).getTime() + 57600000 - 1
    }
    return null
  },
  isFn(fn) {
    return typeof fn === 'function'
  },
  getCookie: name => {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  setCookie(name, value) {
    const Days = 3000
    const exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  deleteCookie(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
    }
  },
  hasClass(obj, cls) {
    if (obj) {
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    }
    return null
  },
  addClass(obj, cls) {
    if (obj && !this.hasClass(obj, cls)) {
      if (obj.className) {
        obj.className += ' ' + cls
      } else {
        obj.className = cls
      }
    }
  },
  removeClass(obj, cls) {
    if (obj && this.hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      obj.className = obj.className.replace(reg, ' ')
    }
  },
  toggleClass(obj, cls) {
    if (this.hasClass(obj, cls)) {
      this.removeClass(obj, cls)
    } else {
      this.addClass(obj, cls)
    }
  },
  formatFile(file) {
    const format = file.name.split('.').pop().toLocaleLowerCase() || ''
    let type = 'document'
    if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
      type = 'image'
    }
    if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
      type = 'ios-film'
    }
    if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
      type = 'ios-musical-notes'
    }
    if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
      type = 'document-text'
    }
    if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
      type = 'stats-bars'
    }
    if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
      type = 'ios-videocam'
    }
    return type
  },
  getToken() {
    let token = this.getCookie('ssss')
    if (!token) {
      token = this.getCookie('token')
    }
    return token
  },
  isImage(items) {
    const len = items.length
    let i = 0
    let item = null

    while (i < len) {
      item = items[i]
      // 针对从word中粘贴来的内容
      if (item.type.includes('rtf')) return false
      if (item.type.includes('image')) {
        return item
      }
      i++
    }
    return false
  },
  // 常用的接口返回数据处理
  handleCommonResponse(i, res, fn) {
    if (res) {
      if (res.data.isSuccess) {
        fn(res.data)
      } else {
        i.$Message.error({
          content: res.data.resultMsg,
          duration: 5
        })
      }
    }
  },
  getModuleListByRequireContext(r) {
    const moduleList = []
    r.keys().forEach(key => {
      moduleList.push(r(key).default)
    })
    return moduleList
  },
  hiddenProperty,
  visibilityChangeEvent,
  isSpaces(str) {
    const barringSpace = str.replace(/\s/g, '')
    return !barringSpace
  },
  // 小时转化为毫秒  value => HH:mm
  hourConversionMs(value) {
    const colonIndex = value.indexOf(':')
    const hour = Number(value.substring(0, colonIndex))
    const minute = Number(value.substring(colonIndex + 1))
    return hour * 3600 * 1000 + minute * 60 * 1000
  },
  // 毫秒转换为小时  HH:mm => ms
  msConversionHour(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      let hour = parseInt(value / (1000 * 60 * 60))
      let minute = (value % (1000 * 60 * 60)) / (1000 * 60)
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      return `${hour}:${minute}`
    }
  },
  // 分钟数格式化 61 => 1小时1分钟
  minutesToHours(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      const hour = Math.floor(value / 60)
      const minute = Math.floor(value % 60)
      return `${hour}小时${minute}分`
    }
  },
  fitlerPercent(value) {
    if (!_.isNumber(value)) {
      return '未知'
    }
    return (parseFloat((value * 100).toFixed(2)) || 0) + '%'
  }
}

export function fmtDateToDay(value) {
  return fmtDate.call(null, value, 'yyyy-MM-dd')
}

export function fmtDateToSecond(value) {
  return fmtDate.call(null, value, 'yyyy-MM-dd hh:mm:ss')
}

function getLocalStorage(name) {
  return window.getLocalStorage(name)
}

function setLocalStorage(name, value) {
  return window.setLocalStorage(name, value)
}

// 获取当前系统类型
export const getSystemType = (query = {}) => {
  const { system, tags } = query
  if (!system) return getSystemTypeFromCatch()
  const params = { system, tags }
  localStorage.setItem('systemType', JSON.stringify(params))
  return params
}

export const portalLocation = {
  dev: 'https://devp.alphalawyer.cn/',
  test: 'https://testp.alphalawyer.cn/',
  pre: 'https://prep.alphalawyer.cn/',
  prod: 'https://p.alphalawyer.cn/'
}

function getSystemTypeFromCatch() {
  const systemType = localStorage.getItem('systemType')
  if (!systemType) {
    const env = process.env.VUE_APP_ENV || 'dev'
    const protalUrl = portalLocation[env]
    window.location = protalUrl
  }
  return JSON.parse(systemType)
}

// 辅助提取新旧活动系统的菜单
export function handleFilterActivitySystemMenu(menus, tags) {
  const rootMenus = menus.filter(menu => (menu.tags === tags))
  const finalMenu = rootMenus.map(rootMenu => {
    const filteredChildren = rootMenu.children.filter(child => child.tags === tags)
    rootMenu.child = filteredChildren
    return rootMenu
  })
  return finalMenu
}
