import { Router } from 'express';
const router = Router();

import path from 'path';

import { products as adminDataProducts } from './admin';

import rootDir, { publicDir } from '../util/path';

router.get('/', (request, response, next) => {
  // response.sendFile(path.join(rootDir, 'views', 'shop.html'));
  response.render('shop', {
    pageTitle: 'Shop',
    path: '/',
    prods: adminDataProducts
  });
  console.log('shop.ts', adminDataProducts);
  // response.sendFile(path.join(__dirname, '../../public', 'views', 'shop.html'));
  // response.sendFile(path.join(publicDir, 'views', 'shop.html'));
});

export default router;
