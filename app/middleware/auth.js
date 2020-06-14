module.exports = (options) => {
  return async (ctx, next) => {
    if (ctx.cookies.get("userId")) {
      await next();
    } else {
      if (
        ctx.url === "/user/login" ||
        ctx.url === "/user/logout" ||
        ctx.url === "/user/register" ||
        ctx.url.indexOf("/goods/list") > -1
      ) {
        await next();
      } else {
        ctx.helper.failureResponse(ctx, 401, "当前未登录");
      }
    }
  };
};
