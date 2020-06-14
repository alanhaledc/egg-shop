module.exports = (app) => {
  const { Schema } = app.mongoose;
  const { ObjectId } = Schema.Types;

  const UserSchema = new Schema({
    userId: String,
    username: String,
    password: String,
    orderList: [
      {
        orderId: String,
        orderTotalPrice: Number,
        addressInfo: {
          type: ObjectId,
          ref: "Address",
        },
        shipInfo: {
          type: ObjectId,
          ref: "Ship",
        },
        orderStatus: Number,
        goodsList: [
          {
            goods: {
              type: ObjectId,
              ref: "Goods",
              required: true,
            },
            goodsNum: Number,
          },
        ],
        createDate: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    cartList: [
      {
        goods: {
          type: ObjectId,
          ref: "Goods",
          required: true,
        },
        goodsNum: Number,
        isChecked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    addressList: [
      {
        recipient: String,
        streetName: String,
        postCode: String,
        phone: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
        isChecked: {
          type: Boolean,
          default: false,
        },
        meta: {
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          updateAt: {
            type: Date,
            default: Date.now(),
          },
        },
      },
    ],
    meta: {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updateAt: {
        type: Date,
        default: Date.now(),
      },
    },
  });

  return app.mongoose.model("User", UserSchema);
};
