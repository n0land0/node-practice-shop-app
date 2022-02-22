"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description.trim();
        this.price = price;
    }
    save() {
        return database_1.db.execute('INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)', [this.title, this.imageUrl, this.description, this.price]);
        // getProductsFromFile((products: ProductObj[]) => {
        //   if (this.id) {
        //     const existingProductIndex: number = products.findIndex(prod => prod.id === this.id);
        //     const updatedProducts: ProductObj[] = [ ...products ];
        //     updatedProducts[existingProductIndex] = this;
        //     fs.writeFile(dataProductsFile, JSON.stringify(updatedProducts), (error) => {
        //       if (error) {
        //         console.log(error);
        //       }
        //     });
        //   } else {
        //     this.id = Math.random().toString();
        //     products.push(this);
        //     fs.writeFile(dataProductsFile, JSON.stringify(products), (error) => {
        //       if (error) {
        //         console.log(error);
        //       }
        //     });
        //   }
        // })
    }
    // static fetchAll(callback: Function) {
    static fetchAll() {
        return database_1.db.execute('SELECT * FROM products');
        // getProductsFromFile(callback);
        // const getAllProducts = async () => {
        // try {
        //   const result = await db.execute('SELECT * FROM products');
        //   console.log(result[0], result[1])
        // } catch (error) {
        //   console.log(error)
        // }
        // }
    }
    // static fetchProductById(id: string, callback: Function) {
    static fetchProductById(id) {
        return database_1.db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
        // getProductsFromFile(callback, id);
        // getProductsFromFile((products: ProductObj[]) => {
        //   const product = products.find((prod: ProductObj) => id === prod.id);
        //   callback(product);
        // })
    }
    static deleteProductById(id) {
        // getProductsFromFile((products: ProductObj[]) => {
        //   const product = products.find(prod => prod.id === id);
        //   const updatedProducts = products.filter(prod => prod.id !== id);
        //   console.log(id)
        //   console.log(updatedProducts)
        //   fs.writeFile(dataProductsFile, JSON.stringify(updatedProducts), (error) => {
        //     if (!error) {
        //       console.log(error);
        //     }
        //     Cart.deleteProductById(id, product.price);
        //   });
        // })
    }
}
exports.default = Product;
