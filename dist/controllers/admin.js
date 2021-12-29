"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProductsPage = exports.deleteAdminProductsPage = exports.postEditProductPage = exports.getEditProductPage = exports.postAddProductPage = exports.getAddProductPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAddProductPage = (request, response, next) => {
    response.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};
exports.getAddProductPage = getAddProductPage;
const postAddProductPage = (request, response, next) => {
    const { title, imageUrl, description, price } = request.body;
    const product = new Product_1.default(null, title, imageUrl, description, price);
    product.save();
    response.redirect('/');
};
exports.postAddProductPage = postAddProductPage;
const getEditProductPage = (request, response, next) => {
    const { editing } = request.query;
    if (!editing) {
        response.redirect('/');
    }
    const { productId } = request.params;
    Product_1.default.fetchProductById(productId, (product) => {
        if (!product) {
            return response.redirect('/');
        }
        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product, editing
        });
        console.log(product);
    });
};
exports.getEditProductPage = getEditProductPage;
const postEditProductPage = (request, response, next) => {
    const { productId, title, imageUrl, description, price } = request.body;
    const updatedProduct = new Product_1.default(productId, title, imageUrl, description, price);
    updatedProduct.save();
    response.redirect('/admin/products');
};
exports.postEditProductPage = postEditProductPage;
const deleteAdminProductsPage = (request, response, next) => {
    const { productId } = request.params;
    Product_1.default.deleteProductById(productId);
    response.redirect('/admin/products');
};
exports.deleteAdminProductsPage = deleteAdminProductsPage;
const getAdminProductsPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products
        });
    });
};
exports.getAdminProductsPage = getAdminProductsPage;
