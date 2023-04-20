import express from "express";
import path from "path";

const viewsRouter = express.Router();

viewsRouter.use("/", serveStatic("main"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/user", serveStatic("mypage-info"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/product", serveStatic("product"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/mypage-info", serveStatic("mypage-info"));
viewsRouter.use("/mypage-order", serveStatic("mypage-order"));
viewsRouter.use("/order", serveStatic("order"));

viewsRouter.use("/", serveStatic(""));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
