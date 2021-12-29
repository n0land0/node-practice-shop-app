"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromCartFromFile = exports.getCartFromFile = exports.getProductsFromFile = exports.dataCartFile = exports.dataProductsFile = exports.srcDir = exports.publicDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let rootDir = '';
const fileName = (_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename;
if (fileName) {
    rootDir = path_1.default.dirname(fileName);
}
exports.publicDir = path_1.default.dirname('../public');
exports.srcDir = path_1.default.dirname('../../');
exports.default = rootDir;
exports.dataProductsFile = path_1.default.join(rootDir, '..', 'src', 'data', 'products.json');
exports.dataCartFile = path_1.default.join(rootDir, '..', 'src', 'data', 'cart.json');
const getProductsFromFile = (callback, id) => {
    fs_1.default.readFile(exports.dataProductsFile, (error, fileContent) => {
        if (error) {
            return callback([]);
            // } else if (id) {
            //   console.log(JSON.parse(fileContent.toString()).find((item: ProductObj) => item.id === id));
            //   callback(JSON.parse(fileContent.toString()).find((item: ProductObj) => item.id === id));
        }
        else {
            callback(JSON.parse(fileContent.toString()));
        }
    });
};
exports.getProductsFromFile = getProductsFromFile;
const getCartFromFile = (id, productPrice) => {
    fs_1.default.readFile(exports.dataCartFile, (error, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!error) {
            cart = JSON.parse(fileContent.toString());
        }
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if (existingProduct) {
            updatedProduct = Object.assign({}, existingProduct);
            updatedProduct.qty += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }
        else {
            updatedProduct = {
                id,
                qty: 1
            };
            cart.products = [...cart.products, updatedProduct];
        }
        if (productPrice) {
            cart.totalPrice += productPrice;
        }
        fs_1.default.writeFile(exports.dataCartFile, JSON.stringify(cart), (error) => console.log(error));
    });
};
exports.getCartFromFile = getCartFromFile;
const deleteItemFromCartFromFile = (id, productPrice) => {
    fs_1.default.readFile(exports.dataCartFile, (error, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!error) {
            cart = JSON.parse(fileContent.toString());
        }
        if (cart.products.length) {
            const updatedCart = Object.assign({}, cart);
            const productToDelete = cart.products.find(prod => prod.id === id);
            if (!productToDelete) {
                return;
            }
            updatedCart.totalPrice -= (productToDelete.qty * productPrice);
            updatedCart.products = cart.products.filter(prod => prod.id !== id);
            fs_1.default.writeFile(exports.dataCartFile, JSON.stringify(updatedCart), (error) => console.log(error));
        }
    });
};
exports.deleteItemFromCartFromFile = deleteItemFromCartFromFile;
