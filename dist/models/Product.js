"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("../util/path");
// const p = path.join(rootDir, '..', 'src', 'data', 'products.json');
//
// const getProductsFromFile = (callback: Function) => {
//   fs.readFile(p, (error, fileContent) => {
//     if (error) {
//       return callback([]);
//     }
//     callback(JSON.parse(fileContent.toString()));
//   })
// }
class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        // products.push(this);
        (0, path_1.getProductsFromFile)((products) => {
            products.push(this);
            fs_1.default.writeFile(path_1.dataProductsFile, JSON.stringify(products), (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
    }
    static fetchAll(callback) {
        (0, path_1.getProductsFromFile)(callback);
    }
}
exports.default = Product;
