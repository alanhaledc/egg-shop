module.exports = (app) => {
  const { Schema } = app.mongoose;

  const GoodsSchema = new Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String,
    productUrl: String,
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

  GoodsSchema.pre("save", function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  return app.mongoose.model("Goods", GoodsSchema);
};
