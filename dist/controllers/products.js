"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsPage = exports.postAddProductPage = exports.getAddProductPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAddProductPage = (request, response, next) => {
    response.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};
exports.getAddProductPage = getAddProductPage;
const postAddProductPage = (request, response, next) => {
    const product = new Product_1.default(request.body.title);
    product.save();
    response.redirect('/');
};
exports.postAddProductPage = postAddProductPage;
const getProductsPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop', {
            pageTitle: 'Shop',
            path: '/',
            prods: products
        });
    });
};
exports.getProductsPage = getProductsPage;
