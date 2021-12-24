import path from 'path';

let rootDir: string = '';
const fileName = require?.main?.filename;

if (fileName) {
  rootDir = path.dirname(fileName);
}

export const publicDir: string = path.dirname('../public');

export default rootDir;
