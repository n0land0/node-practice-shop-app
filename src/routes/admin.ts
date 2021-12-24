import express, { Router } from 'express';
const router = Router();

import path from 'path';

import rootDir, { publicDir } from '../util/path';

interface ProductObj {
  title: string;
}

export const products: ProductObj[] = [];

router.get('/add-product', (request, response, next) => {
  // response.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'add-product.html'));
  // response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  response.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
});

router.post('/add-product', (request, response, next) => {
  // const params<RequestParams> = request.params;
  // const body<RequestBody> = request.body;
  // console.log(body);
  console.log('admin.ts', request.body);
  products.push({ title: request.body.title })
  response.redirect('/');
});

export default router;

// exports.routes = router;
// exports.products = products;
