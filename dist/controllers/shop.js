"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckoutPage = exports.getOrdersPage = exports.getSingleProductPage = exports.postCartPageDeleteItem = exports.postCartPage = exports.getCartPage = exports.getProductsPage = exports.getIndexPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
const getIndexPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: products
        });
    });
};
exports.getIndexPage = getIndexPage;
const getProductsPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: products
        });
    });
};
exports.getProductsPage = getProductsPage;
const getCartPage = (request, response, next) => {
    Cart_1.default.getCart((cart) => {
        Product_1.default.fetchAll((products) => {
            const cartProducts = [];
            products.forEach(prod => {
                const cartProductData = cart.products.find(cartProd => cartProd.id === prod.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: prod,
                        qty: cartProductData.qty
                    });
                }
            });
            response.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
};
exports.getCartPage = getCartPage;
const postCartPage = (request, response, next) => {
    const { productId } = request.body;
    Product_1.default.fetchProductById(productId, (prod) => {
        Cart_1.default.addProduct(productId, +prod.price);
    });
    response.redirect('/cart');
};
exports.postCartPage = postCartPage;
const postCartPageDeleteItem = (request, response, next) => {
    const { productId } = request.body;
    console.log('deleting item with id:', productId);
    Product_1.default.fetchProductById(productId, (product) => {
        Cart_1.default.deleteProductById(productId, product.price);
        response.redirect('/cart');
    });
};
exports.postCartPageDeleteItem = postCartPageDeleteItem;
const getSingleProductPage = (request, response, next) => {
    const { productId } = request.params;
    Product_1.default.fetchProductById(productId, (product) => {
        response.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product
        });
    });
};
exports.getSingleProductPage = getSingleProductPage;
const getOrdersPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop/orders', {
            pageTitle: 'Your Orders',
            path: '/orders'
        });
    });
};
exports.getOrdersPage = getOrdersPage;
const getCheckoutPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout'
        });
    });
};
exports.getCheckoutPage = getCheckoutPage;
