/**
 * 实现金钱数字的格式化
 * @param unit 钱的单位
 * @param needSeparator 是否需要逗号分隔符 1,000,000
 * @param accuracy 精准度 默认保留两位小数
 * @param value 钱的数额
 */
// 1000.101
function fmtMoneyHandler({
  unit = '￥',
  needSeparator = true,
  accuracy = 2,
  value
}) {
  if (!value) {
    return '0'
  }
  const isNegative = value < 0
  const newVal = Math.abs(value).toFixed(accuracy)
  const integerPart = newVal.split('.')[0] || ''
  const decimalPart = newVal.split('.')[1] || ''
  if (integerPart.length / 3 < 1) {
    return `${unit}${isNegative ? '-' : ''}${newVal}`
  }
  const num = integerPart.length % 3
  if (needSeparator) {
    const leadNum = num > 0 ? integerPart.substr(0, num) + ',' : ''
    return `${unit}${isNegative ? '-' : ''}${leadNum}${integerPart.substr(num).replace(/(\d{3})(?=\d)/g, '$1' + ',')}${decimalPart}`
  } else {
    return `${unit}${isNegative ? '-' : ''}${newVal}`
  }
}

export function fmtMoney(value, accuracy = 0) {
  const param = {
    unit: '',
    needSeparator: true,
    accuracy,
    value
  }
  return fmtMoneyHandler(param)
}
