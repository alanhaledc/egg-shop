/*
 * @Author: Hale
 * @Description: goods 路由
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/goods/list', controller.goods.getGoodsList)
  router.post('/goods/cart/add', controller.goods.addCart)
}
