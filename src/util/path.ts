import path from 'path';
import fs from 'fs';
import { ProductObj, CartObj } from '../models/interfaces';

let rootDir: string = '';
const fileName = require?.main?.filename;

if (fileName) {
  rootDir = path.dirname(fileName);
}

export const publicDir: string = path.dirname('../public');
export const srcDir: string = path.dirname('../../');

export default rootDir;



export const dataProductsFile = path.join(rootDir, '..', 'src', 'data', 'products.json');
export const dataCartFile = path.join(rootDir, '..', 'src', 'data', 'cart.json');

export const getProductsFromFile = (callback: Function, id?: string) => {
  fs.readFile(dataProductsFile, (error, fileContent) => {
    if (error) {
      return callback([]);
    // } else if (id) {
    //   console.log(JSON.parse(fileContent.toString()).find((item: ProductObj) => item.id === id));
    //   callback(JSON.parse(fileContent.toString()).find((item: ProductObj) => item.id === id));
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  })
}

export const getCartFromFile = (id: string, productPrice?: number) => {
  fs.readFile(dataCartFile, (error, fileContent) => {
    let cart = { products: [], totalPrice: 0 };
    if (!error) {
      cart = JSON.parse(fileContent.toString());
    }
    const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
      cart.products = [ ...cart.products ];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = {
        id,
        qty: 1
      }
      cart.products = [ ...cart.products, updatedProduct ]
    }
    if (productPrice) {
      cart.totalPrice += productPrice;
    }
    fs.writeFile(dataCartFile, JSON.stringify(cart), (error) => console.log(error));
  })
}

export const deleteItemFromCartFromFile = (id: string, productPrice: number) => {
  fs.readFile(dataCartFile, (error, fileContent) => {
    let cart: CartObj = { products: [], totalPrice: 0 };
    if (!error) {
      cart = JSON.parse(fileContent.toString());
    }
    if (cart.products.length) {
      const updatedCart = { ...cart };
      const productToDelete = cart.products.find(prod => prod.id === id);
      if (!productToDelete) {
        return;
      }
      updatedCart.totalPrice -= (productToDelete.qty * productPrice);
      updatedCart.products = cart.products.filter(prod => prod.id !== id);
      fs.writeFile(dataCartFile, JSON.stringify(updatedCart), (error) => console.log(error));
    }
  })
}
