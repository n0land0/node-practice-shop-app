"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.products = [];
router.get('/add-product', (request, response, next) => {
    // response.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'add-product.html'));
    // response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    response.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
});
router.post('/add-product', (request, response, next) => {
    // const params<RequestParams> = request.params;
    // const body<RequestBody> = request.body;
    // console.log(body);
    console.log('admin.ts', request.body);
    exports.products.push({ title: request.body.title });
    response.redirect('/');
});
exports.default = router;
// exports.routes = router;
// exports.products = products;
