module.exports = (appInfo) => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1545815256856_647";

  // 中间件
  config.middleware = ["auth"];

  // 数据库
  config.mongoose = {
    url: "mongodb://127.0.0.1:27017/shop",
  };

  // 安全
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
