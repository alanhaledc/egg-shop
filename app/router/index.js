module.exports = (app) => {
  require("./user")(app);
  require("./goods")(app);
  require("./ship")(app);
};
