
const DATE_TIME_FORMATTER = 'YYYY-MM-DD hh:mm:ss'
const DATE_FORMATTER = 'YYYY-MM-DD'
const TIME_FORMATTER = 'hh:mm:ss'

/**
 * @augments time:?Date 时间
 * @augments neighbor:?Boolean 是否需要获取相邻月份信息
 * 包含 年、月、日、月份天数、月份第一天是周几
 */
export function getDateInfo(time, neighbor = true) {
  const tDate = time ? new Date(time) : new Date()
  const fullYear = tDate.getFullYear()
  const month = tDate.getMonth() + 1
  const date = tDate.getDate()
  const days = new Date(fullYear, month, 0).getDate()
  const firstDayToWeek = new Date(fullYear, month - 1, 1).getDay()
  const lastDayToWeek = new Date(fullYear, month - 1, days).getDay()
  let lastNeighbor, nextNeighbor
  if (neighbor) {
    const lastNeighborYear = month === 1 ? fullYear - 1 : fullYear
    const nextNeighborYear = month === 12 ? fullYear + 1 : fullYear
    const lastNeighborMonth = month === 1 ? 12 : month - 1
    const nextNeighborMonth = month === 12 ? 1 : month + 1
    lastNeighbor = getDateInfo(`${lastNeighborYear}/${lastNeighborMonth}/${1}`, false)
    nextNeighbor = getDateInfo(`${nextNeighborYear}/${nextNeighborMonth}/${1}`, false)
  }
  const _firstDayToWeek = firstDayToWeek === 0 ? 7 : firstDayToWeek
  const _lastDayToWeek = lastDayToWeek === 0 ? 7 : lastDayToWeek
  return { fullYear, month, date, firstDayToWeek: _firstDayToWeek, lastDayToWeek: _lastDayToWeek, days, lastNeighbor, nextNeighbor }
}

export default {
  name: 'time',

  /**
   * 格式化时间
   * @param {string} time 时间
   * @param {string} formatter 格式
   * @return {string}
   */
  format(time, formatter) {
    return time ? time.date(formatter) : ''
  },

  /**
   * 年-月-日 时:分:秒
   * @param {string} time 时间
   * @return {string}
   */
  getDateTime(time) {
    return this.format(time, DATE_TIME_FORMATTER)
  },

  /**
   * 年-月-日
   * @param {string} time 时间
   * @return {string}
   */
  getDate(time) {
    return this.format(time, DATE_FORMATTER)
  },

  /**
   * 时:分:秒
   * @param {string} time 时间
   * @return {string}
   */
  getTime(time) {
    return this.format(time, TIME_FORMATTER)
  },

  /**
   * 在 time 基础上加 unit 秒、分钟...
   * @param {string} time 时间
   * @param {string} num 数量
   * @param {string} unit 单位（eg: seconds, minutes, hours, days, weeks, months, years）
   */
  add(time, num, unit) {
    return this.format(time).add(num, unit)
  }
}
