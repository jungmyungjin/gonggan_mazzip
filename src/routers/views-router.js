import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('main'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/info', serveStatic('mypage-info'));
viewsRouter.use('/myorder', serveStatic('mypage-order'));
viewsRouter.use('/products/detail', serveStatic('product'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/order/complete', serveStatic('order-complete'));
viewsRouter.use('/admin', serveStatic('/admin'));
viewsRouter.use('/admin-orders', serveStatic('/admin-orders'));
viewsRouter.use('/admin-products', serveStatic('/admin-products'));
viewsRouter.use('/', serveStatic(''));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
