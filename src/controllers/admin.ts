import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Cart from '../models/Cart';
import { ProductObj } from '../models/interfaces';

export const getAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  response.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

export const postAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  const { title, imageUrl, description, price } = request.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  response.redirect('/');
}

export const getEditProductPage = (request: Request, response: Response, next: NextFunction) => {
  const { editing } = request.query;
  if (!editing) {
    response.redirect('/');
  }
  const { productId } = request.params;
  Product.fetchProductById(productId, (product: ProductObj) => {
    if (!product) {
      return response.redirect('/');
    }
    response.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product, editing
    })
    console.log(product);
  })
}

export const postEditProductPage = (request: Request, response: Response, next: NextFunction) => {
  const { productId, title, imageUrl, description, price } = request.body;
  const updatedProduct = new Product(productId, title, imageUrl, description, price);
  updatedProduct.save();
  response.redirect('/admin/products');
}

export const deleteAdminProductsPage = (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.params;
  Product.deleteProductById(productId);
  response.redirect('/admin/products');
}

export const getAdminProductsPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods: products
    });
  });
}
