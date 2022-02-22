import fs from 'fs';
import path from 'path';
import rootDir, { dataCartFile, getCartFromFile, deleteItemFromCartFromFile } from '../util/path';
import { CartObj, ProductObj } from './interfaces';

class Cart {
  products: ProductObj[];
  totalPrice: number;

  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static getCart(callback: Function) {
    fs.readFile(dataCartFile, (error, fileContent) => {
      const cart = JSON.parse(fileContent.toString());
      if (error) {
        callback(null);
      } else {
        callback(cart);
      }
    })
  }

  static addProduct(id: string, productPrice: number) {
    getCartFromFile(id, productPrice);
  }

  static deleteProductById(id: string, productPrice: number) {
    deleteItemFromCartFromFile(id, productPrice);
  }
}

export default Cart;
