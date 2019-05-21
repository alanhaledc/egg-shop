/*
 * @Author: Hale
 * @Description: ship 路由
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/ship/list', controller.ship.getShipList)
  router.post('/ship/checked', controller.ship.shipChecked)
}
