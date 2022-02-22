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
exports.getCheckoutPage = exports.getOrdersPage = exports.getSingleProductPage = exports.postCartPageCreateOrder = exports.postCartPageDeleteItem = exports.postCartPage = exports.getCartPage = exports.getProductsPage = exports.getIndexPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getIndexPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Product.fetchAll((products: ProductObj[]) => {
    //   response.render('shop/index', {
    //     pageTitle: 'Shop',
    //     path: '/',
    //     prods: products
    //   });
    // });
    try {
        const products = yield Product_1.default.findAll();
        response.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: products,
            // isAuthenticated: request.session.isLoggedIn,
            // csrfToken: request.csrfToken()
        });
        // const [ rows, fieldData ] = await Product.fetchAll();
        // response.render('shop/index', {
        //   pageTitle: 'Shop',
        //   path: '/',
        //   prods: rows
        // });
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
        // const [ rows, fieldData ] = await Product.fetchAll();
        const products = yield Product_1.default.findAll();
        response.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: products,
            isAuthenticated: request.session.isLoggedIn
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProductsPage = getProductsPage;
const getCartPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield request.user.getCart();
        const cartProducts = yield cart.getProducts();
        response.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart',
            products: cartProducts,
            isAuthenticated: request.session.isLoggedIn
        });
    }
    catch (error) {
        console.log(error);
    }
    // Cart.getCart((cart: CartObj) => {
    //   Product.fetchAll((products: ProductObj[]) => {
    //     const cartProducts: any[] = [];
    //     products.forEach(prod => {
    //       const cartProductData = cart.products.find(cartProd => cartProd.id === prod.id);
    //       if (cartProductData) {
    //         cartProducts.push({
    //           productData: prod,
    //           qty: cartProductData.qty
    //         });
    //       }
    //     })
    //     response.render('shop/cart', {
    //       pageTitle: 'Your Cart',
    //       path: '/cart',
    //       products: cartProducts
    //     });
    //   })
    // });
});
exports.getCartPage = getCartPage;
const postCartPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.body;
    try {
        let newQuantity;
        const product = yield Product_1.default.findByPk(productId);
        const cart = yield request.user.getCart();
        const [productInCart] = yield cart.getProducts({ where: { id: productId } });
        if (productInCart) {
            newQuantity = productInCart.cartItem.quantity + 1;
        }
        else {
            newQuantity = 1;
        }
        cart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        });
        response.redirect('/cart');
    }
    catch (error) {
        console.log(error);
    }
    // const { productId } = request.body;
    // Product.fetchProductById(productId, (prod: ProductObj) => {
    //   Cart.addProduct(productId, +prod.price);
    // })
    // response.redirect('/cart');
});
exports.postCartPage = postCartPage;
const postCartPageDeleteItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.body;
    try {
        const cart = yield request.user.getCart();
        const [productInCart] = yield cart.getProducts({ where: { id: productId } });
        yield productInCart.cartItem.destroy();
        response.redirect('/cart');
    }
    catch (error) {
        console.log(error);
    }
    // Product.fetchProductById(productId, (product: ProductObj) => {
    //   Cart.deleteProductById(productId, product.price);
    //   response.redirect('/cart');
    // })
});
exports.postCartPageDeleteItem = postCartPageDeleteItem;
const postCartPageCreateOrder = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = request;
    try {
        const cart = yield user.getCart();
        const productsInCart = yield cart.getProducts();
        const newOrder = yield user.createOrder();
        const productsWithQuantity = productsInCart.map((product) => {
            product.orderItem = {
                quantity: product.cartItem.quantity
            };
            return product;
        });
        yield newOrder.addProducts(productsWithQuantity);
        yield cart.setProducts(null);
        response.redirect('/orders');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postCartPageCreateOrder = postCartPageCreateOrder;
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
        const product = yield Product_1.default.findByPk(productId);
        // const [product, ...rest] = await Product.findAll({
        //   where: {
        //     id: productId
        //   }
        // });
        // const [ row, fieldData ] = await Product.fetchProductById(productId);
        // const product = row[0];
        response.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            isAuthenticated: request.session.isLoggedIn,
            product
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProductPage = getSingleProductPage;
const getOrdersPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { user } = request.session;
    const { user } = request;
    const orders = yield user.getOrders({ include: ['products'] });
    console.log(orders);
    response.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        isAuthenticated: request.session.isLoggedIn,
        orders
    });
    // Product.fetchAll((products: ProductObj[]) => {
    //   response.render('shop/orders', {
    //     pageTitle: 'Your Orders',
    //     path: '/orders'
    //   });
    // });
});
exports.getOrdersPage = getOrdersPage;
const getCheckoutPage = (request, response, next) => {
    Product_1.default.fetchAll((products) => {
        response.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout',
            isAuthenticated: request.session.isLoggedIn
        });
    });
};
exports.getCheckoutPage = getCheckoutPage;
