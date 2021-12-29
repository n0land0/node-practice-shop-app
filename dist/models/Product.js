"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("../util/path");
const Cart_1 = __importDefault(require("./Cart"));
class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description.trim();
        this.price = price;
    }
    save() {
        (0, path_1.getProductsFromFile)((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs_1.default.writeFile(path_1.dataProductsFile, JSON.stringify(updatedProducts), (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs_1.default.writeFile(path_1.dataProductsFile, JSON.stringify(products), (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        });
    }
    static fetchAll(callback) {
        (0, path_1.getProductsFromFile)(callback);
    }
    static fetchProductById(id, callback) {
        // getProductsFromFile(callback, id);
        (0, path_1.getProductsFromFile)((products) => {
            const product = products.find((prod) => id === prod.id);
            callback(product);
        });
    }
    static deleteProductById(id) {
        (0, path_1.getProductsFromFile)((products) => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            console.log(id);
            console.log(updatedProducts);
            fs_1.default.writeFile(path_1.dataProductsFile, JSON.stringify(updatedProducts), (error) => {
                if (!error) {
                    console.log(error);
                }
                Cart_1.default.deleteProductById(id, product.price);
            });
        });
    }
}
exports.default = Product;
