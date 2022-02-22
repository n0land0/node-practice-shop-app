import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getLoginPage = (request: Request, response: Response, next: NextFunction) => {
  // const isLoggedIn = request.get('Cookie')?.split('=')[1];
  response.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

export const postLoginPage = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;
    try {
      if (request.session) {
        // const retrievedUser = await User.findByPk(1);
        const retrievedUser = await User.findOne({ where: { email } });
        const usersMatch = await bcrypt.compare(password, retrievedUser.password);
        if (usersMatch) {
          request.session.isLoggedIn = true;
          request.session.user = retrievedUser;
          return request.session.save((error) => {
            if (error) {
              console.log(error);
            }
            response.redirect('/');
          })
        }
        response.redirect('/login');
      }
    // request.isLoggedIn = true;
    // response.setHeader('Set-Cookie', 'isLoggedIn=true');
  } catch (error) {
    console.log(error);
    response.redirect('/login');
  }
};

export const postLogoutPage = async (request: Request, response: Response, next: NextFunction) => {
  request.session.destroy((error) => {
    if (error) {
      console.log(error);
    }
    response.redirect('/');
  });
};

export const getSignupPage = (request: Request, response: Response, next: NextFunction) => {
  response.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

export const postSignupPage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password, confirmPassword } = await request.body;
    const userWithThisEmail = await User.findOne({ where: { email } });
    if (userWithThisEmail) {
      return response.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword });
    response.redirect('/login');
  } catch (error) {
    console.log(error);
  }
};
