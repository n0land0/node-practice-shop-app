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
exports.getAdminProductsPage = exports.deleteAdminProductsPage = exports.postEditProductPage = exports.getEditProductPage = exports.postAddProductPage = exports.getAddProductPage = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAddProductPage = (request, response, next) => {
    response.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: request.session.isLoggedIn
    });
};
exports.getAddProductPage = getAddProductPage;
const postAddProductPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, imageUrl, description, price } = request.body;
        // const { user } = request.session;
        const { user } = request;
        // const result = await user.createProduct({
        //   title, imageUrl, description, price,
        //   // userId: user.id
        // });
        const result = yield Product_1.default.create({
            title, imageUrl, description, price,
            userId: user.id
        });
        // if (result) {
        response.redirect('/admin/products');
        // }
    }
    catch (error) {
        console.log(error);
    }
    // const product = new Product(null, title, imageUrl, description, +price);
    // try {
    //   const finishedSaving = await product.save();
    //   if (finishedSaving) {
    //     response.redirect('/');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // product.save().then(() => response.redirect('/')).catch(error => console.log(error))
});
exports.postAddProductPage = postAddProductPage;
const getEditProductPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { editing } = request.query;
        if (!editing) {
            response.redirect('/');
        }
        const { productId } = request.params;
        // const { user } = request.session;
        const { user } = request;
        const [product] = yield user.getProducts({
            where: {
                id: productId
            }
        });
        // const product = await Product.findByPk(productId);
        if (!product) {
            return response.redirect('/');
        }
        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            isAuthenticated: request.session.isLoggedIn,
            product, editing
        });
    }
    catch (error) {
        console.log(error);
    }
    // Product.fetchProductById(productId, (product: ProductObj) => {
    //   if (!product) {
    //     return response.redirect('/');
    //   }
    //   response.render('admin/edit-product', {
    //     pageTitle: 'Edit Product',
    //     path: '/admin/edit-product',
    //     product, editing
    //   })
});
exports.getEditProductPage = getEditProductPage;
const postEditProductPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, title, imageUrl, description, price } = request.body;
        const product = yield Product_1.default.findByPk(productId);
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        const savedProduct = yield product.save();
        if (savedProduct) {
            response.redirect('/admin/products');
        }
        return savedProduct;
        // const updatedProduct = new Product(productId, title, imageUrl, description, price);
        // updatedProduct.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEditProductPage = postEditProductPage;
const deleteAdminProductsPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    try {
        yield Product_1.default.destroy({
            where: {
                id: productId
            }
        }).then(destroyedProduct => {
            response.redirect('/admin/products');
        });
    }
    catch (error) {
        console.log(error);
    }
    // Product.deleteProductById(productId);
    // response.redirect('/admin/products');
});
exports.deleteAdminProductsPage = deleteAdminProductsPage;
const getAdminProductsPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        response.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
            isAuthenticated: request.session.isLoggedIn
        });
        // Product.fetchAll((products: ProductObj[]) => {
        //   response.render('admin/products', {
        //     pageTitle: 'Admin Products',
        //     path: '/admin/products',
        //     prods: products
        //   });
        // });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAdminProductsPage = getAdminProductsPage;
