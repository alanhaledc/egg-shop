module.exports = (app) => {
  const { router, controller } = app;

  router.post("/user/login", controller.user.login);

  router.post("/user/register", controller.user.register);

  router.post("/user/logout", controller.user.logout);

  router.get("/user/cart", controller.user.getUserCart);

  router.get("/user/cartCount", controller.user.getUserCartCount);

  router.post("/user/cart/del", controller.user.deleteCart);

  router.post("/user/cart/edit", controller.user.editCart);

  router.post("/user/cart/checkedAll", controller.user.checkedAll);

  router.get("/user/address", controller.user.getAddress);

  router.post("/user/address/del", controller.user.deleteAddress);

  router.post("/user/address/edit", controller.user.editAddress);

  router.post("/user/address/add", controller.user.addAddress);

  router.post("/user/address/setDefault", controller.user.setDefaultAddress);

  router.post("/user/address/checked", controller.user.checkedAddress);

  router.get("/user/orderDetail", controller.user.getOrderDetail);
};
