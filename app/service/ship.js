/*
 * @Author: Hale
 * @Description: ship 业务
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
const { Service } = require('egg')

class ShipService extends Service {
  async findShipList() {
    const { ctx } = this
    return await ctx.model.Ship.find()
  }

  async checkedShip(_id) {
    const { ctx } = this
    await ctx.model.Ship.updateMany({}, { $set: { isChecked: false } })
    await ctx.model.Ship.updateOne({ _id }, { $set: { isChecked: true } })
    return this.findShipList()
  }
}

module.exports = ShipService
