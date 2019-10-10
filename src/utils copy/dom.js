import { Message } from 'iview'
/**
 * 复制内容
 * @param {*} name 张三:xx 中的张三
 * @param {*} value 张三xx 中的xx value如果是一个数组的话，表示需要复制多条数据，并且会用/n分隔开
 * 1. 当value为string 时，复制格式为
 *        [name:]?value
 *
 * 2. 当value为arr 且length = 1 时， 复制内容为
 *        [name:]? value.toString()
 *
 * 3. 当value为arr 且length > 2 时，复制内容为
 *        [name:]?
 *        value[0]
 *        value[1]
 *        ...
 *
 * 4.当value为object时，复制内容为
 *        [name:]?
 *        key:value
 *        key:value
 * 因为涉及到换行，所以统一使用textarea来进行处理
 */
export function copySth(value, name) {
  const content = typeHandler(value, name)
  if (content === '') {
    return Message.error('复制失败：内容为空')
  }
  var temInput = document.createElement('textarea')
  temInput.value = content
  document.body.appendChild(temInput)
  temInput.select()
  document.execCommand('copy')
  document.body.removeChild(temInput)
  Message.success('复制成功')
}
// 根据当前的type类型，来处理value
function typeHandler(value, name) {
  if (isArray(value)) {
    return arrayHandler(value, name)
  } else if (isObject(value)) {
    return objectHandler(value, name)
  } else {
    return strHandler(value, name)
  }
}

function isArray(value) {
  return value instanceof Array
}
function isObject(value) {
  return value instanceof Object
}

function objectHandler(value, name) {
  const result = []
  if (name) { result.push(name) }
  for (const i in value) {
    result.push(`${i}:${value[i]}`)
  }
  return result.join('\n')
}
function arrayHandler(value, name) {
  if (value.length === 1) {
    return name ? name + ':' + value.join('\n') : value.join('\n')
  }
  return name ? name + ':\n' + value.join('\n') : value.join('\n')
}

function strHandler(value, name) {
  return value.toString ? name ? name + ':' + value.toString() : value.toString() : ''
}
