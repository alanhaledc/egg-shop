/*
 * @Author: Hale
 * @Description: 工具函数
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
const utility = require('utility')
const { format } = require('date-fns')

module.exports = {
  successResponse(ctx, data) {
    ctx.body = {
      success: true,
      data
    }
  },

  failureResponse(ctx, status, msg) {
    ctx.status = status
    ctx.body = {
      success: false,
      msg
    }
  },

  md5Pwd(pwd) {
    const salt = 'hale_vue_koa_mongoose_#$%^&*!@'
    return utility.md5(utility.md5(pwd + salt))
  },

  createOrderId() {
    const platform = '666'
    const r1 = Math.floor(Math.random() * 10)
    const r2 = Math.floor(Math.random() * 10)
    const sysDate = format(new Date(), 'YYYYMMDDHHmmss')
    return platform + r1 + sysDate + r2
  }
}
