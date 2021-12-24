import path from 'path';
import fs from 'fs';

let rootDir: string = '';
const fileName = require?.main?.filename;

if (fileName) {
  rootDir = path.dirname(fileName);
}

export const publicDir: string = path.dirname('../public');
export const srcDir: string = path.dirname('../../');

export default rootDir;



export const dataProductsFile = path.join(rootDir, '..', 'src', 'data', 'products.json');

export const getProductsFromFile = (callback: Function) => {
  fs.readFile(dataProductsFile, (error, fileContent) => {
    if (error) {
      return callback([]);
    }
    callback(JSON.parse(fileContent.toString()));
  })
}
