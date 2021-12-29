"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("../util/path");
class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }
    static getCart(callback) {
        fs_1.default.readFile(path_1.dataCartFile, (error, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            if (error) {
                callback(null);
            }
            else {
                callback(cart);
            }
        });
    }
    static addProduct(id, productPrice) {
        (0, path_1.getCartFromFile)(id, productPrice);
    }
    static deleteProductById(id, productPrice) {
        (0, path_1.deleteItemFromCartFromFile)(id, productPrice);
    }
}
exports.default = Cart;
