/*
 * @Author: Hale
 * @Description: 路由汇总
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
module.exports = app => {
  require('./user')(app)
  require('./goods')(app)
  require('./ship')(app)
}
