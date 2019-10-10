import iView from 'iview'
import auth from '../auth'

/**
 * REST 辅助函数集合
 * @type {Object}
 */
export default {
  /**
   * 成功处理
   * @param {Object} res 返回数据
   */
  successHandler(res) { },

  /**
   * 失败处理
   * @param {Object} res 返回数据
   */
  errorHandler(e) {
    console.dir(e)
    let message = '系统维护'
    if (e.response.status === 401) {
      message = '您无权限访问改功能'
    }
    iView.Message.error(message)
  },

  /**
   * 获取 Headers
   * @return {Object}
   */
  getHeaders() {
    const { manager, token } = auth.get()

    return {
      auth: window.btoa(`${manager.username}\n${token}`)
    }
  }
}
