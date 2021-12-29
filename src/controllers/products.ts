import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { ProductObj } from '../models/interfaces';

export const getAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  response.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  })
}

export const postAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  const { title, imageUrl, description, price } = request.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  response.redirect('/');
}

export const getProductsPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/product-list', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
      hasProducts: products.length,
      activeShop: true,
      productCSS: true
    });
  });
}
