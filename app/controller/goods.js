const { Controller } = require("egg");

class GoodsController extends Controller {
  async getGoodsList() {
    const { ctx } = this;
    const { page, pageSize, sort, priceLevel } = ctx.query;
    const goodsList = await ctx.service.goods.findGoodsList(
      page,
      pageSize,
      sort,
      priceLevel
    );
    ctx.helper.successResponse(ctx, {
      count: goodsList.length,
      list: goodsList,
    });
  }

  async addCart() {
    const { ctx } = this;
    const _id = ctx.cookies.get("userId");
    const { productId } = ctx.request.body;
    const user = await ctx.service.goods.findUserById(_id);
    let goods = "";
    user.cartList.forEach((item) => {
      if (item.goods.productId === productId) {
        goods = item.goods;
        item.goodsNum += 1;
      }
    });
    if (goods) {
      await user.save();
      ctx.helper.successResponse(ctx, "success");
    } else {
      const newGoods = await ctx.service.goods.findGoods(productId);
      const goodsNum = 1;
      const isChecked = true;
      user.cartList.push({
        goods: newGoods,
        goodsNum,
        isChecked,
      });
      await user.save();
      ctx.helper.successResponse(ctx, "success");
    }
  }
}

module.exports = GoodsController;
