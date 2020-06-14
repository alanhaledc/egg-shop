module.exports = (app) => {
  const { router, controller } = app;
  router.get("/goods/list", controller.goods.getGoodsList);
  router.post("/goods/cart/add", controller.goods.addCart);
};
