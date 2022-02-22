import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { ProductObj, CartObj } from '../models/interfaces';

export const getIndexPage = async (request: Request, response: Response, next: NextFunction) => {
  // Product.fetchAll((products: ProductObj[]) => {
  //   response.render('shop/index', {
  //     pageTitle: 'Shop',
  //     path: '/',
  //     prods: products
  //   });
  // });
  try {
    const products = await Product.findAll();
    response.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
      // isAuthenticated: request.session.isLoggedIn,
      // csrfToken: request.csrfToken()
    });
    // const [ rows, fieldData ] = await Product.fetchAll();
    // response.render('shop/index', {
    //   pageTitle: 'Shop',
    //   path: '/',
    //   prods: rows
    // });
  } catch (error) {
    console.log(error);
  }
}

export const getProductsPage = async (request: Request, response: Response, next: NextFunction) => {
  // Product.fetchAll((products: ProductObj[]) => {
  //   response.render('shop/product-list', {
  //     pageTitle: 'All Products',
  //     path: '/products',
  //     prods: products
  //   });
  // });
  try {
    // const [ rows, fieldData ] = await Product.fetchAll();
    const products = await Product.findAll();
    response.render('shop/product-list', {
      pageTitle: 'All Products',
      path: '/products',
      prods: products,
      isAuthenticated: request.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
}

export const getCartPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const cart = await request.user.getCart();
    const cartProducts = await cart.getProducts();
    response.render('shop/cart', {
      pageTitle: 'Your Cart',
      path: '/cart',
      products: cartProducts,
      isAuthenticated: request.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
  // Cart.getCart((cart: CartObj) => {
  //   Product.fetchAll((products: ProductObj[]) => {
  //     const cartProducts: any[] = [];
  //     products.forEach(prod => {
  //       const cartProductData = cart.products.find(cartProd => cartProd.id === prod.id);
  //       if (cartProductData) {
  //         cartProducts.push({
  //           productData: prod,
  //           qty: cartProductData.qty
  //         });
  //       }
  //     })
  //     response.render('shop/cart', {
  //       pageTitle: 'Your Cart',
  //       path: '/cart',
  //       products: cartProducts
  //     });
  //   })
  // });
}

export const postCartPage = async (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.body;
  try {
    let newQuantity: number;
    const product = await Product.findByPk(productId);
    const cart = await request.user.getCart();
    const [ productInCart ] = await cart.getProducts({ where: { id: productId } });
    if (productInCart) {
      newQuantity = productInCart.cartItem.quantity + 1;
    } else {
      newQuantity = 1;
    }
    cart.addProduct(product, {
      through: {
        quantity: newQuantity
      }
    });
    response.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
  // const { productId } = request.body;
  // Product.fetchProductById(productId, (prod: ProductObj) => {
  //   Cart.addProduct(productId, +prod.price);
  // })
  // response.redirect('/cart');
}

export const postCartPageDeleteItem = async (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.body;
  try {
    const cart = await request.user.getCart();
    const [ productInCart ] = await cart.getProducts({ where: { id: productId } });
    await productInCart.cartItem.destroy();
    response.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
  // Product.fetchProductById(productId, (product: ProductObj) => {
  //   Cart.deleteProductById(productId, product.price);
  //   response.redirect('/cart');
  // })
}

export const postCartPageCreateOrder = async (request: Request, response: Response, next: NextFunction) => {
  const { user } = request;
  try {
    const cart = await user.getCart();
    const productsInCart = await cart.getProducts();
    const newOrder = await user.createOrder();
    const productsWithQuantity = productsInCart.map((product) => {
      product.orderItem = {
        quantity: product.cartItem.quantity
      }
      return product;
    })
    await newOrder.addProducts(productsWithQuantity);
    await cart.setProducts(null);
    response.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
}

export const getSingleProductPage = async (request: Request, response: Response, next: NextFunction) => {
  const { productId } = request.params;
  // Product.fetchProductById(productId, (product: ProductObj) => {
  //   response.render('shop/product-detail', {
  //     pageTitle: product.title,
  //     path: '/products',
  //     product
  //   });
  // });
  try {
    const product = await Product.findByPk(productId);
    // const [product, ...rest] = await Product.findAll({
    //   where: {
    //     id: productId
    //   }
    // });
    // const [ row, fieldData ] = await Product.fetchProductById(productId);
    // const product = row[0];
    response.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      isAuthenticated: request.session.isLoggedIn,
      product
    });
  } catch (error) {
    console.log(error);
  }
}

export const getOrdersPage = async (request: Request, response: Response, next: NextFunction) => {
  // const { user } = request.session;
  const { user } = request;
  const orders = await user.getOrders({ include: ['products'] });
  console.log(orders)
  response.render('shop/orders', {
      pageTitle: 'Your Orders',
      path: '/orders',
      isAuthenticated: request.session.isLoggedIn,
      orders
    });
  // Product.fetchAll((products: ProductObj[]) => {
  //   response.render('shop/orders', {
  //     pageTitle: 'Your Orders',
  //     path: '/orders'
  //   });
  // });
}

export const getCheckoutPage = (request: Request, response: Response, next: NextFunction) => {
  Product.fetchAll((products: ProductObj[]) => {
    response.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout',
      isAuthenticated: request.session.isLoggedIn
    });
  });
}
