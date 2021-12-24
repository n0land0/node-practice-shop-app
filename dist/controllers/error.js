"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageNotFoundPage = void 0;
const getPageNotFoundPage = (request, response, next) => {
    response.status(404).render('page-not-found', {
        pageTitle: 'Page Not Found'
    });
};
exports.getPageNotFoundPage = getPageNotFoundPage;
