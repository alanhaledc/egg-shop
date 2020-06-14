const { Service } = require("egg");

class UserService extends Service {
  async findUser(params) {
    const { ctx } = this;
    return await ctx.model.User.findOne(params);
  }

  async findUserAndPopulate(params, populateStr) {
    const { ctx } = this;
    return await ctx.model.User.findOne(params).populate(populateStr);
  }

  async saveUser(username, password) {
    const { ctx } = this;
    const newUser = new ctx.model.User({
      username,
      password: ctx.helper.md5Pwd(password),
    });
    return await newUser.save();
  }

  async deleteGoodsFromCart(_id, productId) {
    const user = await this.findUserAndPopulate({ _id }, "cartList.goods");
    const idx = user.cartList.findIndex(
      (item) => item.goods.productId === productId
    );
    user.cartList.splice(idx, 1);
    return await user.save();
  }

  async editGoodsFromCart(_id, productId, goodsNum, isChecked) {
    const user = await this.findUserAndPopulate({ _id }, "cartList.goods");
    const idx = user.cartList.findIndex(
      (item) => item.goods.productId === productId
    );
    if (goodsNum) {
      user.cartList[idx].goodsNum = goodsNum;
    }
    if (isChecked !== undefined) {
      user.cartList[idx].isChecked = isChecked;
    }
    return await user.save();
  }

  async deleteAddress(_id, addressId) {
    const user = await this.findUser({ _id });
    const idx = user.addressList.findIndex((item) => {
      return item._id.toString() === addressId;
    });
    user.addressList.splice(idx, 1);
    return await user.save();
  }

  async editAddress(_id, newData) {
    newData.meta.updateAt = Date.now();
    const user = await this.findUser({ _id });
    const idx = user.addressList.findIndex(
      (item) => item._id.toString() === newData._id
    );
    user.addressList.splice(idx, 1, newData);
    return await user.save();
  }

  async addAddress(_id, newAddress) {
    const user = await this.findUser({ _id });
    user.addressList.push(newAddress);
    return await user.save();
  }

  async setDefaultAddress(_id, addressId) {
    const user = await this.findUser({ _id });
    user.addressList.forEach((item) => {
      item.isDefault = item._id.toString() === addressId;
    });
    return await user.save();
  }

  async checkedAddress(_id, addressId) {
    const user = await this.findUser({ _id });
    user.addressList.forEach((item) => {
      item.isChecked = item._id.toString() === addressId;
    });
    return await user.save();
  }
}

module.exports = UserService;
