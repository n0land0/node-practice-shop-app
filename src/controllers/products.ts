import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { ProductObj } from '../models/interfaces';

export const getAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  response.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

export const postAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  const product = new Product(request.body.title);
  product.save();
  response.redirect('/');
}

export const getProductsPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop', {
      pageTitle: 'Shop',
      path: '/',
      prods: products
    });
  });
}
