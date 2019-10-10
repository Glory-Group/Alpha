import Vue from 'vue'
import util from '@/utils'

Vue.filter('fmtDate', function(time) {
  return util.fmtDate(time, 'yyyy-MM-dd hh:mm:ss')
})

Vue.filter('fmtDateOnly', function(time) {
  return util.fmtDate(time, 'yyyy-MM-dd')
})

// 直播课程状态的过滤器
Vue.filter('liveCourseStatusFilter', function(status) {
  let str = ''
  switch (Number(status)) {
    case 1:
      str = '草稿'
      break
    case 2:
      str = '预告'
      break
    case 3:
      str = '直播中'
      break
    case 4:
      str = '结束'
      break
    case 5:
      str = '已下架'
      break
  }
  return str
})

// 毫秒转换为 HH:mm 格式
Vue.filter('msConversionHour', function(value) {
  return util.msConversionHour(value)
})

Vue.filter('minutesToHours', function(value) {
  return util.minutesToHours(value)
})
