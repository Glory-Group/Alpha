import Util from './index.js'

export function findProperty(list, val, key, value) {
  if (!list) return
  const x = list.find(item => {
    return item[key] === val
  }) || {}
  console.log(x)
  return x[value]
}

export function findIdByAreaName(list, val) {
  if (!list) return
  const x = list.find(item => {
    return item.name === val || item.fullName === val
  }) || {}
  return x.id
}

export function assignValueByKey(current, target) {
  for (const i in current) {
    current[i] === target[i]
  }
}

export default {
  findProperty
}

// 输入一个字符串对象， 输出一个`key:value`字符串组成的数组
export function objStr2arr(target) {
  if (!target) return []
  const obj = JSON.parse(target)
  const result = []
  for (const i in obj) {
    result.push(`${i}:${obj[i]}`)
  }
  return result
}

const ACCESSOR_PROXY_TYPES = {
  normal: ',',
  date: 'date'
}
/**
 * 处理在 Select 多选的场景下，需要computed里面写入大量的set/get函数的问题
 * @param {Object} 目标对象
 * @param {String, Array[String]} 要处理的key字段
 * @param {String} 表明要处理那种场景
 */
export function accessorProxy(t, k, type = ',') {
  if (type === ACCESSOR_PROXY_TYPES.normal) {
    return {
      get() {
        return t[k] ? t[k].split(',') : []
      },
      set(val) {
        t[k] = val.join(',')
      }
    }
  }
  // 此时 k 是 Array
  if (type === ACCESSOR_PROXY_TYPES.date) {
    return {
      get() {
        const start = t[k[0]]
        const end = t[k[1]]
        if (start && end) {
          return [start, end]
        }
        return ['', '']
      },
      set(val) {
        t[k[0]] = Util.fmtDate(val[0], 'yyyy-MM-dd hh:mm:ss')
        t[k[1]] = Util.fmtDate(val[1], 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
}
