import { Router } from 'express';
// import path from 'path';

import {
  getIndexPage, getProductsPage, getSingleProductPage,
  getCartPage, postCartPage, postCartPageDeleteItem,
  getOrdersPage, getCheckoutPage
} from '../controllers/shop';

const router = Router();

router.get('/', getIndexPage);
router.get('/products', getProductsPage);
router.get('/products/:productId', getSingleProductPage);
router.get('/cart', getCartPage);
router.post('/cart', postCartPage);
router.post('/cart-delete-item', postCartPageDeleteItem);
router.get('/orders', getOrdersPage);
router.get('/checkout', getCheckoutPage);

export default router;
