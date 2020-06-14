module.exports = (app) => {
  const { Schema } = app.mongoose;

  const ShipSchema = new Schema({
    ship: String,
    cost: String,
    isChecked: {
      type: Boolean,
      default: false,
    },
  });

  return app.mongoose.model("Ship", ShipSchema);
};
