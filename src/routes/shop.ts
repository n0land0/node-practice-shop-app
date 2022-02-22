import { Router } from 'express';
// import path from 'path';

import {
  getIndexPage, getProductsPage, getSingleProductPage,
  getCartPage, postCartPage, postCartPageDeleteItem, postCartPageCreateOrder,
  getOrdersPage, getCheckoutPage
} from '../controllers/shop';
import { checkAuth } from '../middleware/isAuth';

const router = Router();

router.get('/', getIndexPage);
router.get('/products', getProductsPage);
router.get('/products/:productId', getSingleProductPage);
router.get('/cart', checkAuth, getCartPage);
router.post('/cart', checkAuth, postCartPage);
router.post('/cart-delete-item', checkAuth, postCartPageDeleteItem);
router.post('/create-order', checkAuth, postCartPageCreateOrder)
router.get('/orders', checkAuth, getOrdersPage);
router.get('/checkout', checkAuth, getCheckoutPage);

export default router;
