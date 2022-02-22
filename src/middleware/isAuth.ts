import { Request, Response, NextFunction } from 'express';

export const checkAuth = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.session.isLoggedIn) {
    return response.redirect('/login');
  };
  next();
}
