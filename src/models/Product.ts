import fs from 'fs';
import path from 'path';
import rootDir, { dataProductsFile, getProductsFromFile } from '../util/path';
import { ProductObj } from './interfaces';

class Product {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  save() {
    // products.push(this);
    getProductsFromFile((products: ProductObj[]) => {
      products.push(this);
      fs.writeFile(dataProductsFile, JSON.stringify(products), (error) => {
        if (error) {
          console.log(error);
        }
      });
    })
  }

  static fetchAll(callback: Function) {
    getProductsFromFile(callback);
  }
}

export default Product;
