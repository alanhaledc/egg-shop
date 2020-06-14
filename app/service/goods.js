const { Service } = require("egg");

class GoodsService extends Service {
  async findGoodsList(page, pageSize, sort, priceLevel) {
    const { ctx } = this;
    const skip = (page - 1) * pageSize;
    let params = {};
    let priceGt = "";
    let priceLte = "";

    switch (priceLevel) {
      case "0":
        priceGt = "0";
        priceLte = "100000000";
        break;
      case "1":
        priceGt = "0";
        priceLte = "100";
        break;
      case "2":
        priceGt = "100";
        priceLte = "500";
        break;
      case "3":
        priceGt = "500";
        priceLte = "1000";
        break;
      case "4":
        priceGt = "1000";
        priceLte = "5000";
        break;
    }

    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte,
      },
    };

    return await ctx.model.Goods.find(params)
      .skip(skip)
      .limit(parseInt(pageSize))
      .sort({ sortPrice: sort });
  }

  async findUserById(_id) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ _id });
  }

  async findGoods(productId) {
    const { ctx } = this;
    return await ctx.model.Goods.findOne({ productId });
  }
}

module.exports = GoodsService;
