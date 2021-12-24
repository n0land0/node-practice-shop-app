import { Request, Response, NextFunction } from 'express';

export const getPageNotFoundPage = (request: Request, response: Response, next: NextFunction) => {
  response.status(404).render('page-not-found', {
    pageTitle: 'Page Not Found'
  });
}
