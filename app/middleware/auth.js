/*
 * @Author: Hale
 * @Description: 验证中间件
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
module.exports = options => {
  return async (ctx, next) => {
    if (ctx.cookies.get('userId')) {
      await next()
    } else {
      if (
        ctx.url === '/user/login' ||
        ctx.url === '/user/logout' ||
        ctx.url === '/user/register' ||
        ctx.url.indexOf('/goods/list') > -1
      ) {
        await next()
      } else {
        ctx.helper.failureResponse(ctx, 401, '当前未登录')
      }
    }
  }
}
