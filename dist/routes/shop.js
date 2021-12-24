"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import path from 'path';
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.get('/', products_1.getProductsPage);
exports.default = router;
