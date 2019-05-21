/*
 * @Author: Hale
 * @Description: user 控制器
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-21
 */
const { Controller } = require('egg')

class UserController extends Controller {
  async login() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const user = await ctx.service.user.findUser({ username })
    if (!user) {
      ctx.helper.failureResponse(ctx, 200, '用户不存在')
    } else {
      const match = await ctx.service.user.findUser({
        username,
        password: ctx.helper.md5Pwd(password)
      })
      if (match) {
        ctx.cookies.set('userId', user._id, {
          path: '/',
          maxAge: 86400000,
          httpOnly: false
        })
        ctx.helper.successResponse(ctx, {
          username
        })
      } else {
        ctx.helper.failureResponse(ctx, 200, '用户名或者密码不正确！')
      }
    }
  }

  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const exist = await ctx.service.user.findUser({ username })
    if (exist) {
      ctx.helper.failureResponse(ctx, 200, '用户名重复,请重新输入或者去登录！')
      return
    }
    const user = await ctx.service.user.saveUser(username, password)
    const { _id } = user
    ctx.cookies.set('userId', _id, {
      path: '/',
      maxAge: 86400000,
      httpOnly: false
    })
    ctx.helper.successResponse(ctx, {
      username
    })
  }

  async logout() {
    const { ctx } = this
    ctx.cookies.set('userId', null)
    ctx.helper.successResponse(ctx, '注销成功')
  }

  async getUserCart() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const user = await ctx.service.user.findUserAndPopulate(
      { _id },
      'cartList.goods'
    )
    ctx.helper.successResponse(ctx, user.cartList)
  }

  async getUserCartCount() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const user = await ctx.service.user.findUserAndPopulate(
      { _id },
      'cartList.goods'
    )
    let count = 0
    if (user.cartList.length) {
      user.cartList.forEach(item => {
        if (item.isChecked) {
          count += item.goodsNum
        }
      })
    }
    ctx.helper.successResponse(ctx, count)
  }

  async deleteCart() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { productId } = ctx.request.body
    const user = await ctx.service.user.deleteGoodsFromCart(_id, productId)
    ctx.helper.successResponse(ctx, user.cartList)
  }

  async editCart() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { productId, goodsNum, isChecked } = ctx.request.body
    const user = await ctx.service.user.editGoodsFromCart(
      _id,
      productId,
      goodsNum,
      isChecked
    )
    ctx.helper.successResponse(ctx, user.cartList)
  }

  async checkedAll() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { isCheckedAll } = ctx.request.body
    const user = await ctx.service.user.findUserAndPopulate(
      { _id },
      'cartList.goods'
    )
    if (user.cartList.length) {
      user.cartList.forEach(item => {
        item.isChecked = isCheckedAll
      })
      await user.save()
      ctx.helper.successResponse(ctx, user.cartList)
    }
  }

  async getAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const user = await ctx.service.user.findUser({ _id })
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async deleteAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { addressId } = ctx.request.body
    const user = await ctx.service.user.deleteAddress(_id, addressId)
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async editAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { newData } = ctx.request.body
    const user = await ctx.service.user.editAddress(_id, newData)
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async addAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { newAddress } = ctx.request.body
    const user = await ctx.service.user.addAddress(_id, newAddress)
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async setDefaultAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { addressId } = ctx.request.body
    const user = await ctx.service.user.setDefaultAddress(_id, addressId)
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async checkedAddress() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const { addressId } = ctx.request.body
    const user = await ctx.service.user.checkedAddress(_id, addressId)
    ctx.helper.successResponse(ctx, user.addressList)
  }

  async getOrderDetail() {
    const { ctx } = this
    const _id = ctx.cookies.get('userId')
    const user = await ctx.service.user.findUserAndPopulate(
      { _id },
      'cartList.goods'
    )
    const goodsList = user.cartList.filter(item => item.isChecked === true)
    let orderTotalPrice = 0
    user.cartList.forEach(item => {
      if (item.isChecked) {
        orderTotalPrice += item.goods.salePrice * item.goodsNum
      }
    })
    let address = ''
    user.addressList.forEach(item => {
      if (item.isChecked === true) {
        address = item
      }
    })
    let ship = ''
    const shipList = await ctx.service.ship.findShipList()
    shipList.forEach(item => {
      if (item.isChecked) {
        ship = item
      }
    })
    // 加上快递费
    orderTotalPrice += parseInt(ship.cost)
    const orderId = ctx.helper.createOrderId()
    const order = {
      orderId,
      orderTotalPrice,
      addressInfo: address,
      shipInfo: ship,
      orderStatus: 1,
      goodsList
    }
    user.orderList.push(order)
    user.cartList = []
    await user.save()
    ctx.helper.successResponse(ctx, order)
  }
}

module.exports = UserController
