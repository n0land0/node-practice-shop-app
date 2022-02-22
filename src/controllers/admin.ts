import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Cart from '../models/Cart';
import { ProductObj } from '../models/interfaces';

export const getAddProductPage = (request: Request, response: Response, next: NextFunction) => {
  response.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: request.session.isLoggedIn
  })
}

export const postAddProductPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { title, imageUrl, description, price } = request.body;
    // const { user } = request.session;
    const { user } = request;
    // const result = await user.createProduct({
    //   title, imageUrl, description, price,
    //   // userId: user.id
    // });
    const result = await Product.create({
      title, imageUrl, description, price,
      userId: user.id
    });
    // if (result) {
      response.redirect('/admin/products');
    // }
  } catch (error) {
    console.log(error);
  }
  // const product = new Product(null, title, imageUrl, description, +price);
  // try {
  //   const finishedSaving = await product.save();
  //   if (finishedSaving) {
  //     response.redirect('/');
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // product.save().then(() => response.redirect('/')).catch(error => console.log(error))
}

export const getEditProductPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { editing } = request.query;
    if (!editing) {
      response.redirect('/');
    }
    const { productId } = request.params;
    // const { user } = request.session;
    const { user } = request;
    const [ product ] = await user.getProducts({
      where: {
        id: productId
      }
    });
    // const product = await Product.findByPk(productId);
    if (!product) {
      return response.redirect('/');
    }
    response.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      isAuthenticated: request.session.isLoggedIn,
      product, editing
    })
  } catch (error) {
    console.log(error)
  }
  // Product.fetchProductById(productId, (product: ProductObj) => {
  //   if (!product) {
  //     return response.redirect('/');
  //   }
  //   response.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     product, editing
  //   })
}

export const postEditProductPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { productId, title, imageUrl, description, price } = request.body;
    const product = await Product.findByPk(productId);
    product.title = title;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price;
    const savedProduct = await product.save();
    if (savedProduct) {
      response.redirect('/admin/products');
    }
    return savedProduct;
    // const updatedProduct = new Product(productId, title, imageUrl, description, price);
    // updatedProduct.save();
  } catch (error) {
    console.log(error);
  }
}

export const deleteAdminProductsPage = async (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.params;
  try {
    await Product.destroy({
      where: {
        id: productId
      }
    }).then(destroyedProduct => {
      response.redirect('/admin/products');
    })
  } catch (error) {
    console.log(error);
  }
  // Product.deleteProductById(productId);
  // response.redirect('/admin/products');
}

export const getAdminProductsPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();
    response.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods: products,
      isAuthenticated: request.session.isLoggedIn
    });
    // Product.fetchAll((products: ProductObj[]) => {
    //   response.render('admin/products', {
    //     pageTitle: 'Admin Products',
    //     path: '/admin/products',
    //     prods: products
    //   });
    // });
  } catch (error) {
    console.log(error);
  }
}
