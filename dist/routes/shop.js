"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import path from 'path';
const shop_1 = require("../controllers/shop");
const router = (0, express_1.Router)();
router.get('/', shop_1.getIndexPage);
router.get('/products', shop_1.getProductsPage);
router.get('/products/:productId', shop_1.getSingleProductPage);
router.get('/cart', shop_1.getCartPage);
router.post('/cart', shop_1.postCartPage);
router.post('/cart-delete-item', shop_1.postCartPageDeleteItem);
router.get('/orders', shop_1.getOrdersPage);
router.get('/checkout', shop_1.getCheckoutPage);
exports.default = router;
