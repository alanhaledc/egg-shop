/*
 * @Author: Hale
 * @Description: 全局默认配置
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545815256856_647'

  // 中间件
  config.middleware = ['auth']

  // 数据库
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/shop'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  return config
}
