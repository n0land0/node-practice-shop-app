import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Cart from '../models/Cart';
import { ProductObj, CartObj } from '../models/interfaces';

export const getIndexPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products
    });
  });
}

export const getProductsPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/product-list', {
      pageTitle: 'All Products',
      path: '/products',
      prods: products
    });
  });
}

export const getCartPage = (request: Request, response: Response, next: NextFunction) => {
  Cart.getCart((cart: CartObj) => {
    Product.fetchAll((products: ProductObj[]) => {
      const cartProducts: any[] = [];
      products.forEach(prod => {
        const cartProductData = cart.products.find(cartProd => cartProd.id === prod.id);
        if (cartProductData) {
          cartProducts.push({
            productData: prod,
            qty: cartProductData.qty
          });
        }
      })
      response.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    })
  });
}

export const postCartPage = (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.body;
  Product.fetchProductById(productId, (prod: ProductObj) => {
    Cart.addProduct(productId, +prod.price);
  })
  response.redirect('/cart');
}

export const postCartPageDeleteItem = (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.body;
  console.log('deleting item with id:', productId);
  Product.fetchProductById(productId, (product: ProductObj) => {
    Cart.deleteProductById(productId, product.price);
    response.redirect('/cart');
  })
}

export const getSingleProductPage = (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.params;
  Product.fetchProductById(productId, (product: ProductObj) => {
    response.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product
    });
  });
}

export const getOrdersPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/orders', {
      pageTitle: 'Your Orders',
      path: '/orders'
    });
  });
}

export const getCheckoutPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout'
    });
  });
}
