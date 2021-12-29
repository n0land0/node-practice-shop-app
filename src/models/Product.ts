// import fs from 'fs';
// import path from 'path';
// import rootDir, { dataProductsFile, getProductsFromFile } from '../util/path';
import { ProductObj } from './interfaces';
import Cart from './Cart';
import { db } from '../util/database';

class Product implements ProductObj {
  id?: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(id: string | null, title: string, imageUrl: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description.trim();
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
      [ this.title, this.imageUrl, this.description, this.price ]
    );
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
    return db.execute('SELECT * FROM products');
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
  static fetchProductById(id: string) {
    return db.execute(
      'SELECT * FROM products WHERE products.id = ?',
      [ id ]
    );
    // getProductsFromFile(callback, id);
    // getProductsFromFile((products: ProductObj[]) => {
    //   const product = products.find((prod: ProductObj) => id === prod.id);
    //   callback(product);
    // })
  }

  static deleteProductById(id: string) {
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

export default Product;
