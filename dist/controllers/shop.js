"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckoutPage = exports.getOrdersPage = exports.getSingleProductPage = exports.postCartPageDeleteItem = exports.postCartPage = exports.getCartPage = exports.getProductsPage = exports.getIndexPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
const getIndexPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Product.fetchAll((products: ProductObj[]) => {
    //   response.render('shop/index', {
    //     pageTitle: 'Shop',
    //     path: '/',
    //     prods: products
    //   });
    // });
    try {
        const [rows, fieldData] = yield Product_1.default.fetchAll();
        response.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: rows
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getIndexPage = getIndexPage;
const getProductsPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Product.fetchAll((products: ProductObj[]) => {
    //   response.render('shop/product-list', {
    //     pageTitle: 'All Products',
    //     path: '/products',
    //     prods: products
    //   });
    // });
    try {
        const [rows, fieldData] = yield Product_1.default.fetchAll();
        response.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: rows
        });
    }
    catch (error) {
        console.log(error);
    }
});
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
const getSingleProductPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    // Product.fetchProductById(productId, (product: ProductObj) => {
    //   response.render('shop/product-detail', {
    //     pageTitle: product.title,
    //     path: '/products',
    //     product
    //   });
    // });
    try {
        const [row, fieldData] = yield Product_1.default.fetchProductById(productId);
        const product = row[0];
        response.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product
        });
    }
    catch (error) {
        console.log(error);
    }
});
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
