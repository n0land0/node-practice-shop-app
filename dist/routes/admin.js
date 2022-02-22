"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import path from 'path';
// import rootDir, { publicDir } from '../util/path';
const admin_1 = require("../controllers/admin");
const isAuth_1 = require("../middleware/isAuth");
const router = (0, express_1.Router)();
router.get('/add-product', isAuth_1.checkAuth, admin_1.getAddProductPage);
router.get('/products', isAuth_1.checkAuth, admin_1.getAdminProductsPage);
router.post('/add-product', isAuth_1.checkAuth, admin_1.postAddProductPage);
router.get('/edit-product/:productId', isAuth_1.checkAuth, admin_1.getEditProductPage);
router.post('/edit-product', isAuth_1.checkAuth, admin_1.postEditProductPage);
router.post('/delete-product/:productId', isAuth_1.checkAuth, admin_1.deleteAdminProductsPage);
exports.default = router;
